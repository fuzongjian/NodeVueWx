class Person{
    constructor(name,age){
        this._name = name
        this._age = age
    }
    run(){
        console.log('name is ' + this._name+' age is ' + this._age);
    }
    // 静态方法
    static  work(){
        console.log('I am working');
    }
};
// var person = new Person('付宗建',25);
// person.run();
// Person.work();


class DB{
    static getInstance(){/* 单例 */
        if(!DB.instance){
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor(){
        console.log('实例化触发构造函数');
        this.connect();
    }
    find(){
        console.log('查询数据库');
    }
    connect(){
        console.log('连接数据库');
    }
}
var db = DB.getInstance();
var db2 = DB.getInstance();