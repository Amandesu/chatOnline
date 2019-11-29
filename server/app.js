const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
//const SeesionRedis = require("./utils/seesion-redis")
const routers = require('./routers/index')
const config = require('./config')



const app = new Koa()

// 配置session中间件
/* app.use(session({
    key: 'SESSION_ID',
    store: new SeesionRedis(),
    cookie: {
        httpOnly:true,
       // overwrite:true,
        path:"/",
        maxAge: 3600000
    }
})) */
 
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

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)
