var exports = module.exports = {};
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var mongoose = require('mongoose');

exports.shortgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration':1}).limit(5).exec(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.longgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({'matchDuration':-1}).limit(5).exec(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};