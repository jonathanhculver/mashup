var express = require('express');
var path = require('path');
var jade = require('jade');
var app = express();


app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/template/:name', function(req, res){
	var name = req.params.name;
	res.render(name);
});

app.get('/env', function(req, res) {
	console.log(env);
	var env = process.env.PORT ? 'prod' : 'dev';
	res.json(env);
});

var server = app.listen(process.env.PORT || 5001, function() {
	console.log("Listening on port "+ server.address().port);
});
