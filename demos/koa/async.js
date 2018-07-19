/*
* 1、async是让方法变成异步。（返回值是Promise）
* */
async function testAsync() {
    return 'hello async';
}
// console.log(testAsync());
/*
*  2、await必须在async方法中才能使用是因为await访问本身就会造成程序停止阻塞，所以必须在异步方法中执行
* */

function getData() {
    return '付宗建';
}
async function getAsyncData() {
    return '周星驰';
}
async function test() {
    const  v2 = await getAsyncData();
    console.log(v2);
    const  v1 = await getData();
    console.log(v1);
}
// test();

/*
*   3、async/await同时使用
*   async会将其后的函数的返回值封装成一个Promise对象，而await会等待这个Promise完成，并将其reslove结果返回出来
* */
function findData() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long time value"),1000);
    });
}
async function getFindData() {
    const  v = await findData();
    console.log(v);
}
// getFindData();

/*
*  4、
* */