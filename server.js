const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = '老婆我爱你';
});

app.listen(3000);