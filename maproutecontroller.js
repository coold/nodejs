exports.mapRoute=function(app,prefix){
 prefix='/'+prefix;
 var prefixObj=require('./controllers/'+prefix);

 app.get(prefix,prefixObj.index);

 app.get(prefix+'/new',prefixObj.new);

 app.get(prefix+'/:sn',prefixObj.show);

 app.post(prefix+'/create',prefixObj.create);

 app.get(prefix+'/:sn/edit',prefixObj.edit);

 app.put(prefix+'/:sn',prefixObj.update);

 app.del(prefix+'/:sn',prefixObj.destroy);
}