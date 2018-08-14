// DB库
var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
class DB{
    static getInstance(){
        if (!DB.instance){
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor(){
        // 初始化连接数据库
        this.dbClient = '';// 属性，放db属性
        this.connect();// 程序一旦跑起来就进行连接数据库
    }
    connect(){
        return new Promise((resolve,reject)=> {
            if(!this.dbClient){  // 解决数据库多次连接的问题
                MongoClient.connect(config.db_url,(err,client)=>{
                    if(err){
                        reject(err);
                    }else{
                        this.dbClient = client.db(config.db_name);
                        resolve(this.dbClient);
                    }
                })
            }else{
                resolve(this.dbClient);
            }
        })

    }
    find(collectionName,json){
        return new Promise((resolve, reject)=> {
            this.connect().then(function (db) {
                var result = db.collection(collectionName).find(json);
                result.toArray(function (err, docs) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(docs);
                    }
                })
            })
        })

    }
    update(){

    }
    insert(collectionName,json){
        return new Promise((resolve, reject) => {
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(json,function (err, result) {
                    if (err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        })
    }
}
// var db = DB.getInstance();
// console.time('start');
// db.find('department',{'name':'iOS开发'}).then(function (data) {
//     // console.log(data);
//     console.timeEnd('start');
// })
// setTimeout(function () {
//     console.time('start1');
//     db.find('department',{'name':'iOS开发'}).then(function (data) {
//         // console.log(data);
//         console.timeEnd('start1');
//     })
// },3000)
// var db2 = DB.getInstance();
// setTimeout(function () {
//     console.time('start2');
//     db2.find('department',{'name':'iOS开发'}).then(function (data) {
//         // console.log(data);
//         console.timeEnd('start2');
//     })
// },4000)

module.exports = DB.getInstance();