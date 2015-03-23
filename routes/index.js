// Get all of our database models
var models = require('../models');
var moment = require('moment');

exports.viewHome = function(req, res){
 
    res.render('index');

};