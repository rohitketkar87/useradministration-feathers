var mongoose = require('mongoose');

var usersSchema = mongoose.Schema ({
	firstname : String,
	lastname: String,
	email: String,
	password: String,
	createdAt: Date
});

var Users = mongoose.model('users', usersSchema);
module.exports = Users;