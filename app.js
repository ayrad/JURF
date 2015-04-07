// Variables
var express = require('express'),
		app = express(),
		mongoose = require('mongoose'),
		fs = require('fs'),
		bodyParser = require('body-parser'),
		apicache = require('apicache').options({debug: true}).middleware;
app.use(bodyParser.json());

// Load config.json & connect to DB
var config = JSON.parse(fs.readFileSync('./config.json'));
mongoose.connect('mongodb://' + config.db_host + '/' + config.db_name, function(err){
	if (err) console.log('[ERROR] Could not connect to the database: ' + err);
});

// Load mongoose models
fs.readdirSync(__dirname + '/models').forEach(function(filename){
	if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

// HTTP listener
app.use(express.static(__dirname + '/public'));
console.log('\rJURF (Riot Games API Challenge) by Mohammadi El Youzghi (MohiX)\r\r');
app.listen(config.port, function(){
	console.log('[+] Server running on port ' + config.port);
	console.log('[+] API URL: ' + config.api);
	console.log('[+] API KEY: ' + config.apikey);
	console.log('[+] STATIC DATA URL: ' + config.api);
	console.log('[!] If API data is not correct, please edit config.json');
});

// Matches routes
var matchesroutes = require('./routes/matches');
app.get('/games/latest', matchesroutes.latestgames);
//app.get('/games', matchesroutes.allgames);
app.get('/game/:id', apicache('1 day'), matchesroutes.gameById);
app.get('/champ/:id', apicache('1 week'), matchesroutes.champById);
app.get('/spell/:id', apicache('1 week'), matchesroutes.spellById);

// Stats routes
var statsroutes = require('./routes/stats');
app.get('/stats/games/short', statsroutes.shortgames);
app.get('/stats/games/long', statsroutes.longgames);
app.get('/stats/games/count', statsroutes.gamescount);
app.get('/stats/champs/mostplayed', statsroutes.mostplayedchamps);
app.get('/stats/champs/lessplayed', statsroutes.lessplayedchamps);

// Cronjobs
// Retrieve URF Games info from Riot Games API & save it on local DB
var gamescron = require('./cronjobs/game');
gamescron.run();