
var Mongoose = require('mongoose');


var PostSchema = new Mongoose.Schema({
  	// fields are defined here
	"postCategory": String,
	"postTitle": String,
	"postInfo": String,
	"fullPost": String,
	"bumpCount": Number,
	"dateTime": Date,
	"dateString": String,
	"dateDay": Number
});

exports.Post = Mongoose.model('Post', PostSchema);

var userSchema = new Mongoose.Schema({
	"username": String,
	"email": String,
	"password": String
});

exports.User = Mongoose.model('User', userSchema);

var loginSchema = new Mongoose.Schema({
	"username": String,
	"email": String,
	"password": String
});

exports.LoggedIn = Mongoose.model('LoggedIn', loginSchema);