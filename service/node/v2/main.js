const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/status', async (ctx, next) => {
    ctx.body = 'ok';
})

router.get('/env', async (ctx, next) => {
    const version = process.versions.node;
    ctx.body = 'node' + version;
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);