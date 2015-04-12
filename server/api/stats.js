var exports = module.exports = {};
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var mongoose = require('mongoose');

// Games
exports.gamesCount = function (req, res) {
	console.log('GET ' + req.url);
	mongoose.model('games').count(function (err, result) {
		var count = {count: result};
		if (!err)
			res.send(count);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.shortGames = function (req, res) {
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration': 1}).limit(7).exec(function (err, games) {
		if (!err)
			res.send(games);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.longGames = function (req, res) {
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration': -1}).limit(7).exec(function (err, games) {
		if (!err)
			res.send(games);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

// Champions
exports.mostPlayedChamps = function (req, res) {
	console.log('GET ' + req.url);

	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{"$group": {
				_id: "$participants.championId",
				"times": {"$sum": 1}
			}},
		{$sort: {times: -1}},
		{$limit: 7}
	], function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.lessPlayedChamps = function (req, res) {
	console.log('GET ' + req.url);

	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{"$group": {
				_id: "$participants.championId",
				"times": {"$sum": 1}
			}},
		{$sort: {times: 1}},
		{$limit: 7}
	], function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

// Damages
exports.strongChamps = function (req, res) {
	console.log('GET ' + req.url);

	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{$group: {
			_id: "$participants.championId",
			magic: {"$avg": "$participants.magicDamageDealt"},
			physical: {"$avg": "$participants.physicalDamageDealt"},
			true: {"$avg": "$participants.trueDamageDealt"}
		}},
		{ $group: {
			_id: "$_id",
			magic: {$sum: "$magic"},
			physical: {$sum:"$physical"},
			true: {$sum:"$true"},
			total : { $sum: { $add : ["$magic", "$physical", "$true"] }}
		}},
		{$sort: {total: -1}},
		{$limit: 7}
	], function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.weakChamps = function (req, res) {
	console.log('GET ' + req.url);
	
	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{$group: {
			_id: "$participants.championId",
			magic: {"$avg": "$participants.magicDamageDealt"},
			physical: {"$avg": "$participants.physicalDamageDealt"},
			true: {"$avg": "$participants.trueDamageDealt"}
		}},
		{ $group: {
			_id: "$_id",
			magic: {$sum: "$magic"},
			physical: {$sum:"$physical"},
			true: {$sum:"$true"},
			total : { $sum: { $add : ["$magic", "$physical", "$true"] }}
		}},
		{$sort: {total: 1}},
		{$limit: 7}
	], function (err, result) {
		if (!err)
			res.send(result);
		else
			console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

// Miscellaneous
exports.bankerMan = function (req, res) {
	console.log('GET ' + req.url);
};