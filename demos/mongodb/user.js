var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String},
    department: {type: String},
    age: { type: Number}
});
module.exports = mongoose.model('User',UserSchema);