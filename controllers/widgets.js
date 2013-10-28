var widgets= [
  {
    id: 1,
    name: 'ololo',
    price: 100.0
  },
  {
    id: 2,
    name: 'oloscdclo',
    price: 1030.0
  }
]


exports.index=function(req,res){
 res.render('widgets/index', {title:'Widgets', widgets: widgets});
};

exports.new=function(req,res){
  res.render('widgets/new')
}

exports.show=function(req,res){
 var indx=req.params.id-1;
 if(!widgets[indx]){
  res.send('there is no such widget');
 }
 else
 {
  res.render('widgets/show', {widget: widgets[indx]})
 }
};

exports.create=function(req,res){
  var indx=widgets.length+1;
  widgets[widgets.length]={
   id: indx,
   name: req.body.name,
   price: parseFloat(req.body.price)
  }
  console.log('added widget');
  res.render('widgets/added', {widget: widgets[indx-1], title: 'Added widget'})
};

exports.update=function(req,res){
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
};

exports.destroy=function(req,res){
 var indx=req.params.id-1;
 delete widgets[indx];
 res.send('widget deleted')
};

exports.edit=function(req,res){
  res.render('widgets/edit', {widget: widgets[req.params.id-1]})
}