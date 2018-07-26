const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-art-template');
const path = require('path');

const app = new Koa();
render(app, {
    root: path.join(__dirname, 'views'),  // 模板引擎的位置
    extname: '.html',//后缀名
    debug: process.env.NODE_ENV !== 'production'  // 是否开启调试模式
});

// app.use(async (ctx) => {
//
// });
router.get('/', async(ctx) => {
    let list = {
        name : '周星驰'
    }
    await ctx.render('index',{
        list : list
    })
})
router.get('/news', async(ctx) => {

})
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001,()=>{
    console.log('listening at 3001');
});