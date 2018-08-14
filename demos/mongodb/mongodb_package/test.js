const Koa = require('koa');
const Router = require('koa-router');
const DB = require('./module/db');
// 实例化
const  app = new Koa();
const router = new Router();
// ctx上下文context，包含了request和response等信息
router.get('/',async(ctx)=> {
    let result = await DB.find('department',{});
    ctx.body = result;
}).get('/add',async(ctx) => {
    let result = await DB.insert('department',{'name': '体育部'})
    ctx.body = result;
}).get('/update',async(ctx)=>{
    let result = await DB.update('department',{"name" : "体育部"},{"name" : "Unity开发"});
    ctx.body = result;
});

// 启动路由
app.use(router.routes());
// 可以配置也可以不配置
app.use(router.allowedMethods());
app.listen(3000,()=>{
    console.log('listen port 3000');
});