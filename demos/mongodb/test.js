var User = require('./user.js');
function insert() {
    for (var i = 0 ; i < 1000; i ++){
        var user = new User({
            name: "名字"+i,
            department: '部门'+i,
            age: 45
        });
        user.save(function (err, res) {
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        });
    }
}
// insert();
/*
*       更新
* */
function update() {
    var where = {'name':'周星驰'};
    var updateStr = {'department': '演员'};
    User.update(where,updateStr,function (err, res) {
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
}
// update();
function findByIdAndUpdate() {
    var id = '5b4ea3026d33276544a28c2a';
    var updatestr = {'name':'通过id修改名字'};
    User.findByIdAndUpdate(id,updatestr,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// findByIdAndUpdate();
function findOneAndUpdate() {
    var where = {'name': '名字10'};
    var updatestr = {'department': '通过FindOneAndUpdate修改的部门'};
    User.findOneAndUpdate(where,updatestr,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
//findOneAndUpdate();
/*
*           删除
* */
function remove() {
    var where = {name : '名字1'};
    User.remove(where,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// remove();
function findByIdAndRemove() {
    var id = '5b4ea3026d33276544a28bc6';
    User.findByIdAndRemove(id,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
//findByIdAndRemove();
function findOneAndRemove() {
    var where = {name : '名字3'};
    User.findOneAndRemove(where,function(err,res){
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// findOneAndRemove();
/*
*       条件查询
* */
function find() {
    var where = {name: '付宗建'};
    User.find(where,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res[0]._id);
    })
}
// find();
function findById() {
    var id = '5b4ea3026d33276544a28c2a';
    User.findById(id,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// findById();
// 第二个参数设置为要查询输出的字段（1表示查询输出该字段，0表示不输出）（一旦配置该opt，除_id,其他字段默认是不输出的）
function getByContions() {
    var where = {name: '付宗建'};
    var opt = { name : 1, _id : 0, department : 1};
    User.find(where,opt,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// getByContions();
//  模糊查询
function getByRegex() {
    var where = { name : {$regex: /名字/}};
    User.find(where,function (err,res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// getByRegex();
/*
*       数量查询
* */
function getCountByContions() {
    var where = {department : {$regex: /部门10/}};
    // collection.countDocuments    collection.estimatedDocumentCount
    User.countDocuments(where,function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res);
    })
}
// getCountByContions();
// 分页
function getByPage() {
    var pagesize = 5;  // 一页多少条
    var curentpage = 2;  // 当前第几页
    var condition = {};  // 条件
    var sort = {};      // 排序
    var skipNum = (curentpage - 1) * pagesize;  // 跳过数
    User.find(condition).skip(skipNum).limit(pagesize).sort().exec(function (err, res) {
        if (err){
            console.log(err);
            return;
        }
        console.log(res.length);
    })
}
getByPage();