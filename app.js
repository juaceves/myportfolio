
/**
 * Module dependencies.
 */

var express = require('express');
var moment = require('moment');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');

var accSettings = require('./routes/accSettings');

var about = require('./routes/about');
var help = require('./routes/help');

var login = require('./routes/login');
var signup = require('./routes/signup');
var forgotPass = require('./routes/forgotPass');
var logout = require('./routes/logout');

var app = express();

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'feelzApp';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

//global random variable
var random_num = Math.random();

app.configure(function() {
	app.set('random_num', random_num); 
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.viewHome);
app.post('/post/new', index.pushPost);
app.post('/post/bumpPost', index.bumpPost);
app.post('/post/:id/delete', index.deletePost);
app.get('/category/:id', index.viewCategory);

app.get('/sort/date', index.viewHome);
app.get('/sort/date/bump', index.sortByDateBump);
app.get('/sort/bump', index.sortByBump);

app.get('/Account_Settings', accSettings.viewAccSettings);
app.get('/changePassword', accSettings.changePass);

app.get('/About', about.viewAbout);
app.get('/Help', help.viewHelp);

app.get('/Login', login.viewLogin);
app.get('/Login_Facebook', login.viewLoginFB);
app.get('/LoginFormSubmit', login.submitLogin);
app.get('/Signup', signup.viewSignup);
app.get('/SignupFormSubmit', signup.submitSignup);
app.get('/Forgot_Password', forgotPass.viewForgotPass);
app.get('/Logout', logout.submitLogout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
