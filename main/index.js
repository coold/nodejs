var redis=require('redis');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.stats=function(req,res){
	var client=redis.createClient();
	client.select(2);
	client.multi()
	.smembers('ip')
	.hgetall('myurls')
	.exec(function(err,result){
		var ips=result[0];
		var urls=result[1];
		console.log(urls);
		res.render('stats', {title: 'Stats', urls: urls, ips: ips});
		client.quit();
	})
}