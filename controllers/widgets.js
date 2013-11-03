var Widget=require('../models/widgets.js');


exports.index=function(req,res){
  Widget.find({},function(err,result){
    console.log(result);
 res.render('widgets/index', {title:'Widgets', widgets: result});
})
};

exports.new=function(req,res){
  res.render('widgets/new')
}

exports.show=function(req,res){
  var sn=req.params.sn;
  Widget.findOne({sn:sn},function(err,docs){


 if(err){
  res.send('there is no such widget');
 }
 else
 {
  console.log(docs);
  res.render('widgets/show', {widget: docs})
 }
   });
};

exports.create=function(req,res){
  var widget={
   sn: req.body.sn,
   name: req.body.name,
   price: parseFloat(req.body.price)
  }
  var widgetObj=new Widget(widget);
  widgetObj.save(function(err,data){
    if(err)
      {res.send(err);}
    else
    {
  console.log('added widget');
  res.render('widgets/added', {widget: widget, title: 'Added widget'})
  }
  })
};

exports.update=function(req,res){
 var sn=req.params.sn;
   var widget={
   sn: req.body.sn,
   name: req.body.name,
   price: parseFloat(req.body.price)
  }
  Widget.update({sn:sn}, widget, function(err){
    if(err){
      res.send(err);
    }
    else
    {
      res.render('widgets/added',{widget: widget})
    }
  })

};

exports.destroy=function(req,res){
 var sn=req.params.sn;
 Widget.remove({sn:sn},function(err,result){
  if(err){
    res.send(err);
  }
  else
  {
    res.send(sn+'deleted')
  }
 })
};

exports.edit=function(req,res){
  var sn=req.params.sn;
  Widget.findOne({sn:sn},function(err,result){
    if(err){
      res.send(err);
    }
    else
    {
      res.render('widgets/edit', {widget: result})
    }
  })
  
}