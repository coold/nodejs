var redis=require('redis');
module.exports=function(req,res,next){
		var client=redis.createClient();
		client.on('error',function(err){
			console.log(err)
		});
		client.select(2);
		client.sadd('ip',req.socket.remoteAddress);
		client.hincrby('myurls',req.url,1);
		client.quit();
		next();
	}