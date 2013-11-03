var mongoose=require('mongoose');
var Schema=mongoose.Schema,
ObjectId=Schema.ObjectId;
var Widget=new Schema({
	sn: {type:String, required:true, trim: true},
	name:{type: String, required: true, trim:true},
	price: Number
});
module.exports=mongoose.model('Widget',Widget);