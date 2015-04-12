var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spellsSchema = new Schema({
	_id : Number,
	key : String,
	name : String,
	title : String
});

mongoose.model('spells', spellsSchema);