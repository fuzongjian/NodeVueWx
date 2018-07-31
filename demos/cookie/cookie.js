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
/*
*  1、保存用户信息
*  2、浏览器历史记录
*  3、猜你喜欢的功能
*  4、10天免登陆
*  5、多个界面的数据传值
*
* */
// app.use(async (ctx) => {
//
// });
router.get('/', async(ctx) => {
    // 设置cookies
    ctx.cookies.set('userinfo','fuzongjian',{
        //maxAge:60*1000*60,  // 设置过期时间
        //path:'/news', //  配置可以访问的页面
        //domain:'.baidu.com',// 正常请情况下不要设置，
       // httpOnly: true;// true表示这个cookie只有服务器端可以访问，false表示客户端（.js）、服务器都可以访问方法
    });
    ctx.body = 'hello world';
})
router.get('/news',async(ctx) =>{
    // 拿到cookies
    var userinfo = ctx.cookies.get('userinfo');
    console.log(userinfo);
})
// 设置中文（koa中没法直接设置中文的cookie）  base64转码
router.get('/shop',async(ctx) =>{
    var namedata = new Buffer('付宗建').toString('base64');
    console.log(namedata);
    var name = new Buffer(namedata,'base64').toString();
    console.log(name);
})
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001,()=>{
    console.log('listening at 3001');
});