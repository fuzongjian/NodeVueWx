/*
*   let和var一样，块作用域
* */
let name  = 'fuzongjian';
console.log(name);
/*
*  const 定义常量
* */

/*
*  模板字符串
* */
var name_ = '付宗建';
var age = 23;
console.log(`${name_}的年龄是${age}`);
/*
*   属性的简写 方法的简写
* */
var username = '付宗建';
var app = {
    username: username,
    run: function () {
        console.log(`${username}正在跑步！`);
    }
}
var app_ = {
    username,
    run(){
        console.log(`${username}正在跑步！`);
    }
}
console.log(app.username);
app.run();
console.log(app_.username);
app_.run();
/*
*  箭头函数
* */
setTimeout(function () {
    console.log('1s....');
},1000);
setTimeout(()=>{
    console.log('2s...');
},2000);
/*
*  回到函数
* */
function getData(callback) {
    setTimeout(()=>{
        var name = 'fuzongjian---fuzongjian';
        callback(name);
    },1000);
}
getData(function (data) {
    console.log(data);
})
/*
*   Promise(异步)
*   resolve 成功的回调函数   reject 是失败的回调函数
* */
var p = new Promise(function (resolve,reject) {
    setTimeout(()=>{
        var name = 'fuzongjian---fuzongjian--fuzongjian';
        if(Math.random()<0.5){
            reject('fail');
        }else{
            resolve(name);
        }
    },1500);
})
p.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})

function promise(resolve, reject) {
    setTimeout(()=>{
        resolve('hello');
    },2500);
}
var p_ = new Promise(promise);
p_.then((data) =>{
    console.log(data);
}).catch((err) =>{
    console.log(err);
})