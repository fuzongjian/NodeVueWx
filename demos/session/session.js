var Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const session = require('koa-session');
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 5000, /** cookie的过期时间  maxAge is ms（default is 1 days）*/
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** 在每次请求时强行设置cookie，这将充值cookie过期时间(default is false) */
    renew: false, /** (boolean) renew 一般设置为true*/
};
app.keys = ['some key hurr'];
app.use(async(ctx, next) =>{
    if (ctx.path === '/favicon.ico')return;
    await next();
})
router.get('/login',async(ctx) => {
    ctx.session.userinfo = '付宗建';
    ctx.body = 'login success';
});
router.get('/',async(ctx) => {
    // console.log(ctx.session.userinfo);
    ctx.body = ctx.session.userinfo;
})


app.use(session(CONFIG,app));
// 启动路由
app.use(router.routes());
// 可以配置也可以不配置
app.use(router.allowedMethods());
app.listen(4001,()=> {
    console.log('listening at 4001');
})