var MongoClient = require('mongodb').MongoClient;
var db_url = 'mongodb://127.0.0.1:27017';
var db_name = 'company';
// 连接数据库
console.time('start')
MongoClient.connect(db_url,(err,client) => {
    if (err){
        console.log(err);
    }else{
        var db = client.db(db_name);
        // 增加数据
        db.collection('department').insertOne({'name':'iOS开发'},function (err, result) {
            if (!err){
                console.log('增加成功');
                // client.close();
            }
        })
        // 查询数据
       var result =  db.collection('department').find({});
       result.toArray((err,doc)=>{
           console.timeEnd('start');
           console.log(doc);
       })

    }
})
