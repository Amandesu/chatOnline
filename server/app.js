const path = require('path')
const http = require('http')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const socket = require("socket.io");
const MysqlStore = require('koa-mysql-session')
const SeesionRedis = require("./utils/seesion-redis")
const routers = require('./routers/index')
const config = require('./config')



const app = new Koa()

// 配置session中间件
app.use(session({
 key: 'SESSION_ID',
    store: new SeesionRedis(),
    cookie: {
        httpOnly:true,
       // overwrite:true,
        path:"/",
        maxAge: 3600000
    }
})) 
 
// 配置ctx.body解析中间件
app.use(bodyParser())
// 配置控制台日志中间件
app.use(koaLogger())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './../web')
))
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 启动socket服务
const server = http.createServer(app.callback());
const io = socket(server);

// 所有活动中的socket
var mapAcsocket = {};


io.on('connection', socket => {
    // 有新用户上线了
    socket.on('new user', (username) => {
        console.log(username+"-connect")
        socket.username = username
        mapAcsocket[username] = socket;
            
        socket.emit('login', "login")
			// socket.emit('login',user);
			// socket.broadcast.emit('user joined',username,(user.length-1));
			// console.log(user);
	})
    //捕获客户端send信息
    //前端io.send(message)
    socket.on('message', async function (message) {
        
    })
    socket.on('send private message', async function (res, fn) {
        if (res.recipient) {
            fn("success")
            let resSocket = mapAcsocket[res.recipient];
            console.log(Object.keys(mapAcsocket), res.recipient, !!resSocket)
            resSocket && resSocket.emit('receive private message', {
                type:res.type,
                sendUser:socket.username,
                content:res.content
            });
        } else {
            fn(null)
        }
    })
    //监听客户端断开连接
    socket.on('disconnect', async function () {
        console.log(socket.username+"-disconnect")
        if(socket.username in mapAcsocket){
            Reflect.deleteProperty(mapAcsocket, socket.username) 
            console.log("delete socket")
		}
    })
  
});



server.listen(config.port);
// 监听启动端口
app.listen()
console.log(`the server is start at port ${config.port}`)
