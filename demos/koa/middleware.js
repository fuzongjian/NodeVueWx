const Koa = require('koa');
const Router = require('koa-router');

// 实例化
const  app = new Koa();
const router = new Router();
/*
*   1、应用级中间件（匹配路由之前做的操作）
* */
app.use(async(ctx, next) => {
    // 匹配路由之前打印日期
    console.log(new Date());
    // 当前路由匹配完成以后继续向下匹配
    await next();
});
/*
*   2、路由中间件
* */
router.get('/',async(ctx,next) => {
    console.log('路由级中间件');
    await next();
})
router.get('/',async(ctx) => {
    ctx.body = 'Hello Koa';
});
/*
*  3、错误处理中间件
* */
app.use(async(ctx,next) => {
    await next();
    if(ctx.status == 404){
        ctx.status = 404;
        ctx.body = '这是一个404页面';
    }
})

/*
*  4、第三方中间件
* */
// 启动路由
app.use(router.routes());
// 可以配置也可以不配置
app.use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('listen port at 3000');
});