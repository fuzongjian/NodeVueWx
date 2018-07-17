var User = require('./user.js');
function insert() {
    var user = new User({
        name: "周星驰",
        department: '演员',
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
// insert();
function update() {
    var where = {'name':'周星驰'};
    var updateStr = {'department': '我是一个演员'};
    User.update(where,updateStr,function (err, res) {
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }
    });
}
update();