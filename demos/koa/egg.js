const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
// 实例化
const  app = new Koa();
const router = new Router();
// 配置模板引擎中间件，（注意模板引擎的后缀为HTML）
// app.use(views('views'), {map:{html: 'ejs'}});
// 或者如下也行
app.use(views('views',{
    extension: 'ejs'  // 应用ejs模板引擎
}))
// 注意：我们需要在每一个路由的render里面都要渲染一个公共的数据
app.use(async(ctx,next)=>{
    ctx.state.userinfo = 'fuzongjian';
    await next();
})
router.get('/',async(ctx) =>{
    let title  = 'hello world';
    await ctx.render('index',{
        title: title
    });
})
router.get('/news',async(ctx) => {
    let arr = ['111','222','333'];
    let content = "<h2>这是一个h2</h2>";
    let num = 123;
    await ctx.render('news',{
        list: arr,
        content: content,
        num: num
    })
})
app.use(router.routes());// 启动路由
app.use(router.allowedMethods());
app.listen(3000,() => {
    console.log('listening at 3000');
})