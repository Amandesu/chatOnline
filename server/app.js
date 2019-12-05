const path = require('path')
const http = require('http')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const SeesionRedis = require("./utils/seesion-redis")
const routers = require('./routers/index')
const config = require('./config')
const Iosocket = require('./iosocket')
const { createFailResult } = require('./utils/createResult')



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
app.use( async (ctx, next) => {
    if (ctx.session.user || ctx.request.url == "/user/login" || ctx.request.url == "/user/register") {
        return await next();
    } else {
        ctx.body = createFailResult({})
    }
   
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 启动socket服务
const server = http.createServer(app.callback());
// 注入socket
Iosocket(server)

server.listen(config.port);
// 监听启动端口
app.listen()
console.log(`the server is start at port ${config.port}`)
