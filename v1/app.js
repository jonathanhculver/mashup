var restify = require('restify');
var server = restify.createServer();
var ig = require('instagram-node').instagram();

ig.use({
  access_token: "240207395.1fb234f.1fdad5a3bbd7452ab7aeb34d4f5b9256"
});

server.use(restify.CORS());

server.get('/images/tag/:tag', function(req, res, next){
	var tag = req.params.tag;
	var data= {};
	ig.tag_media_recent(tag, [], function(err, result, remaining, limit) {
		data.images = result;
		data.count = result.length;
		res.send(data);
	});
});

server.get('/images/tag/:tag/user/:username', function(req, res, next){
	var tag = req.params.tag;
	var username = req.params.username;
	var images = [];
	var data = {};
	ig.tag_media_recent(tag, [], function(err, result, remaining, limit) {
		for(var i =0, max=result.length; i<max; i++) {
			if(result[i].user.username === username) {
				images.push(result[i]);
			}
		}
		data.images = images;
		data.count = images.length;
		res.send(data);
	});
});

server.listen(process.env.PORT || 5000, function() {
	console.log("Listening on port "+ server.address().port);
});