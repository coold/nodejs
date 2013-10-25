﻿
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var map=require('./maproutecontroller');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){ res.send("404 lol")});
app.use(function(err,req,res,next){
  console.log(err);
  res.send(err.message)
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var prefixes=['widgets'];
prefixes.forEach(function(prefix){
 map.mapRoute(app,prefix)
})


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
