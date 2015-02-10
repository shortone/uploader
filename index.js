
// MODULES
// ====================================

var express = require('express');
var app = express();

var formidable = require('formidable');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/uploader');

var File = require('./app/models/file');

// CONFIGURATIONS
// ====================================

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// API ROUTES
// ====================================

var router = express.Router();

router.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api'});
})

router.route('/files')
	.get(function(req, res) {
		File.find(function(err, files) {
			if (err) {
				res.send(err);
			}
			res.json(files);
		});
	})
	.post(function(req, res) {
		var form = new formidable.IncomingForm();
		form.uploadDir = './public/files';
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files) {
			if (err) {
				res.json({
					error: err
				});
			} else {
				var file = new File();
				file.name = files.file.name;
				file.size = files.file.size;
				file.path = files.file.path.substring(files.file.path.indexOf('/'));
				file.type = files.file.type;
				file.mtime = files.file.mtime;

				file.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json(file);
				});
			}
		});
	});

app.use('/api', router);

// START SERVER
// ====================================
app.listen(port);
