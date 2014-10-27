var app = window.app || {};

app.mashup = (function() {
	
	var self = {};
	var content;
	var env;
	
	self.init = function() {
		content = $('#content');
		self.setEnvironment(function() {
			if(env === 'dev') {
				var host = 'http://localhost:5000';
			} else {
				var host = 'http://picsofpix.herokuapp.com/v1';
			}
			var url = '/images/tag/picsofpix/user/jonathanhculver';
			url = host+url;
			var params = {};
			app.mashup.image.init();
			app.mashup.helper.ajax(url, params, function(results) {
				content.html('');
				for(var i=0; i<results.count; i++) {
					app.mashup.image.buildImage(results.images[i]);
					if(i+1%3 === 0) {
						content.append("<div class='grid_clear'></div>");
					}
				}
			}, 'GET');
		});
	};

	self.setEnvironment = function(callback) {
		app.mashup.helper.ajax('/env', {}, function(data) {
			$('#env').attr('data-env', data);
			env = data;
			callback();
		}, 'GET');
	};

	return self;
})();

app.mashup.image = (function(){
	var self = {};
	var template;
	var content;
	
	self.init = function() {
		content = $('#content');
		app.mashup.helper.fetchTemplate('image', function(html) {
			template = html;
		});
	};

	self.buildImage = function(image) {
		var imgHtml = $(template).clone();
		var img = imgHtml.find('img');
		var a = imgHtml.find('a');
		a.attr('href', image.link);
		img.attr('src', image.images.standard_resolution.url);
		content.append(imgHtml);
	};

	return self;
})();

app.mashup.helper = (function() {
	var self = {};
	self.ajax = function(url, params, callback, method) {
    	if(method === null) method = 'POST';
    	callback = callback || noop;
			$.ajax({
				type: method,
				url: url,	
				data: params
			})
			.success(function(data) {
				callback(data);
			});
    };

    self.fetchTemplate = function(name, callback) {
    	var url = '/template/'+name;
    	callback = callback || noop;
			$.ajax({
				type: 'GET',
				url: url
			})
			.success(function(data) {
				callback(data);
			});
	};

	return self;
})();