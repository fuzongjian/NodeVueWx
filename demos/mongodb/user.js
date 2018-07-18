var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String,index: true}, // 建立索引值
    department: {type: String},
    age: { type: Number}
});
module.exports = mongoose.model('User',UserSchema);