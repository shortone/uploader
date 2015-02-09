var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
	name: String,
	size: Number,
	path: String,
	type: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('File', FileSchema);