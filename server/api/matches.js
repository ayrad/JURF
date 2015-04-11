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
	mongoose.model('games').findOne({matchId: req.params.id}, function(err, game){
		if(!err) res.send(game);
		else console.log('ERROR: Could not retrieve game ' + req.params.id + ' data');
	});
};

exports.champById = function(req, res){
	var id = req.params.id;
	console.log('GET ' + req.url);
	var url = config.static + 'euw' + '/v1.2/champion/' + id + '?api_key=' + config.apikey;
	console.log('GET EXTERNAL ' + url);
	request(url, function (err, apires, body) {
		if (!err && apires.statusCode === 200) {
			res.json(JSON.parse(body));
		}
	});
};

exports.spellById = function(req, res){
	var id = req.params.id;
	console.log('GET ' + req.url);
	var url = config.static + 'euw' + '/v1.2/summoner-spell/' + id + '?api_key=' + config.apikey;
	console.log('GET EXTERNAL ' + url);
	request(url, function (err, apires, body) {
		if (!err && apires.statusCode === 200) {
			res.json(JSON.parse(body));
		}
	});
};