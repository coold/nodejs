
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var widgets= [
  {
    id: 1,
    name: 'ololo',
    price: 100.0
  }
]

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/widgets',function(req,res){
 res.send(widgets);
});

app.get('/widgets/:id',function(req,res){
 var indx=req.params.id-1;
 if(!widgets[indx]){
  res.send('there is no such widget');
 }
 else
 {
  res.send(widgets[indx])
 }
});

app.post('/widgets/add',function(req,res){
  var indx=widgets.length+1;
  widgets[widgets.length]={
   id: indx,
   name: req.body.name,
   price: parseFloat(req.body.price)
  }
  console.log('added widget');
  res.send('Added widget to list')
});

app.put('/widgets/:id/update',function(req,res){
 var indx=req.params.id-1;
 if(!widgets[indx]){res.send('no such')}
  else{
   widgets[indx]={
   id: parseInt(req.params.id),
   name: req.body.name,
   price: parseFloat(req.body.price)
  }
  res.send('updated')
 }
});

app.del('/widgets/:id/delete',function(req,res){
 var indx=req.params.id-1;
 delete widgets[indx];
 res.send('widget deleted')
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
