var mongo = require('mongoose');
var db_url = 'mongodb://localhost:27017/company';
mongo.connect(db_url,{useNewUrlParser : true});
mongo.connection.on('connected',function () {
    console.log('Mongoose connect successfully');
});
mongo.connection.on('error',function (err) {
    console.log('Mongoose connect error' + err);
});
mongo.connection.on('disconnected',function () {
    console.log('Mongoose disconnected');
});
module.exports = mongo;