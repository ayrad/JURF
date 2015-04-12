var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var championsSchema = new Schema({
	_id : Number,
	key : String,
	name : String,
	title : String
});

mongoose.model('champions', championsSchema);