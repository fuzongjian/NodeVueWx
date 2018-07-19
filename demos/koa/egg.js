const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
// 实例化
const  app = new Koa();
const router = new Router();
app.use(views('views'),{map:{html,'ejs'}});