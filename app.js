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
fs.readdirSync('./server/models').forEach(function(filename){
	if(~filename.indexOf('.js')) require('./server/models/' + filename);
});

// HTTP listener
app.use(express.static('./client'));
console.log('\rJURF (Riot Games API Challenge) by Mohammadi El Youzghi (MohiX)\r\r');
app.listen(config.port, function(){
	console.log('[+] Server running on port ' + config.port);
	console.log('[+] API URL: ' + config.api);
	console.log('[+] API KEY: ' + config.apikey);
	console.log('[+] STATIC DATA URL: ' + config.api);
	console.log('[!] If API data is not correct, please edit config.json');
});

// Matches routes
var apigames = require('./server/api/matches');
app.get('/games/latest', apigames.latestgames);
//app.get('/games', apigames.allgames);
app.get('/game/:id', apicache('1 day'), apigames.gameById);
app.get('/champ/:id', apicache('1 week'), apigames.champById);
app.get('/spell/:id', apicache('1 week'), apigames.spellById);

// Stats routes
var apistats = require('./server/api/stats');
app.get('/stats/games/count', apistats.gamesCount);
app.get('/stats/games/short', apistats.shortGames);
app.get('/stats/games/long', apistats.longGames);
app.get('/stats/champs/mostplayed', apistats.mostPlayedChamps);
app.get('/stats/champs/lessplayed', apistats.lessPlayedChamps);
app.get('/stats/champs/strong', apistats.strongChamps);
app.get('/stats/champs/weak', apistats.weakChamps);

// Cronjobs
// Retrieve URF Games info from Riot Games API & save it on local DB
var gamescron = require('./server/cronjobs/game');
gamescron.run();