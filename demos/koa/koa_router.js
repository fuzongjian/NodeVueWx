const Koa = require('koa');
const Router = require('koa-router');
// 实例化
const  app = new Koa();
const router = new Router();
// ctx上下文context，包含了request和response等信息
router.get('/',function (ctx, next) {
    ctx.body = 'Hello Koa';
}).get('/news',async(ctx) => {
    ctx.body = '这是一个新闻界面';
})
router.get('/content',async(ctx,next) =>{
    // 获取get传值 http://localhost:3000/content?id=1000&name=%E4%BB%98%E5%AE%97%E5%BB%BA

    //  ctx.query 获取的是对象  用的最多的方式  { id: '1000', name: '付宗建' }
    console.log(ctx.query);
    // ctx.querystring    id=1000&name=%E4%BB%98%E5%AE%97%E5%BB%BA
    console.log(ctx.querystring);
     // 从request中获取GET请求
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    //  直接从上下文获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    let ctx_url = ctx.url;
    ctx.body = {
        ctx_url,
        req_query,
        req_querystring,
        ctx_querystring,
        ctx_query
    }
})
/*
*  动态路由
* */
router.get('/content/:aid',async(ctx) => {
    // 获取动态路由的数据
    ctx.body = ctx.params;
})
// 启动路由
app.use(router.routes());
// 可以配置也可以不配置
app.use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('listen port 3000');
})