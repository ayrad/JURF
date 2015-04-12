var exports = module.exports = {};
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));
var mongoose = require('mongoose');
var request = require('request');

exports.latestgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find().sort({_id:-1}).limit(5).exec(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.allgames = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').find(function(err, games){
		if(!err) res.send(games);
		else console.log('ERROR: ' + req.url + ' > ' + err);
	});
};

exports.gameById = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('games').findOne({matchId: req.params.id}, function(err, game){
		if(!err) res.send(game);
		else console.log('ERROR: Could not retrieve game "' + req.params.id + '" data');
	});
};

exports.champById = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('champions').findOne({_id: req.params.id}, function(err, champ){
		if(!err) res.send(champ);
		else console.log('ERROR: Could not retrieve champion "' + req.params.id + '" data');
	});
};

exports.spellById = function(req, res){
	console.log('GET ' + req.url);
	mongoose.model('spells').findOne({_id: req.params.id}, function(err, spell){
		if(!err) res.send(spell);
		else console.log('ERROR: Could not retrieve spell "' + req.params.id + '" data');
	});
};