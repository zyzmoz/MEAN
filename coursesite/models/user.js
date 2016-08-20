var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
	firstName : String,
	lastName : String,
	userName : String,
	password: String,
	created: {type: Date, default : Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = {User: User};


