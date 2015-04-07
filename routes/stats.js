var exports = module.exports = {};
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var mongoose = require('mongoose');

exports.shortgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration':1}).limit(7).exec(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.longgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration':-1}).limit(7).exec(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.mostplayedchamps = function(req, res){
	console.log('GET ' + req.url);

	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{"$group": {
				_id : "$participants.championId",
				"times": {"$sum": 1}
			}},
		{$sort: {times: -1}},
		{$limit: 7}
	], function (err, result) {
		if(!err) res.send(result);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.lessplayedchamps = function(req, res){
	console.log('GET ' + req.url);

	mongoose.model('games').aggregate([
		{"$unwind": "$participants"},
		{"$group": {
				_id : "$participants.championId",
				"times": {"$sum": 1}
			}},
		{$sort: {times: 1}},
		{$limit: 7}
	], function (err, result) {
		if(!err) res.send(result);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.gamescount = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').count(function(err, result){
		var count = {count:result};
		if(!err) res.send(count);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};