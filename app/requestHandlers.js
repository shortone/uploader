var fs = require('fs');
var querystring = require('querystring');

function start(res, postData) {
	console.log('Request handler "start" was called.');

	var html = fs.readFileSync('./app/views/index.html');

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(html);
}

function upload(res, postData) {
	console.log('Request handler "upload" was called.');
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.write("You've sent: " + querystring.parse(postData).text);
	res.end();
}

exports.start = start;
exports.upload = upload;