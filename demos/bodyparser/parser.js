var Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views');
var common = require('./module/common.js');
var bodyparser = require('koa-bodyparser');// post  请求数据处理
var static = require('koa-static');
var app = new Koa();
app.use(bodyparser());
app.use(views('views',{
    extension: 'ejs'
}))
// 配置静态web服务的中间件
app.use(static(__dirname + '/static'));

router.get('/',async (ctx) => {
    await ctx.render('index');
});

router.post('/doAdd',async(ctx) => {
    // 获取表单提交的数据

    ctx.body = ctx.request.body;

    return;
    // 原生nodejs在koa中获取表中提交的数据
    var data = await common.getPostData(ctx);
    ctx.body = data;
})
router.get('/news',async (ctx) => {
    ctx.body = 'this is news page';
});
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3006,()=>{
    console.log('listening at 3006');
});