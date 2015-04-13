// Variables
var express = require('express'),
		app = express(),
		mongoose = require('mongoose'),
		fs = require('fs'),
		bodyParser = require('body-parser'),
		apicache = require('apicache').options({debug: true}).middleware;
app.use(bodyParser.json());

// Load config.js & connect to DB
var config = require('./config');
mongoose.connect('mongodb://' + config.database.username + ':' + config.database.password + '@' + config.database.host + ':' + config.database.port + '/' + config.database.name, function(err){
	if (err){
		console.log('\r\r[ERROR] Could not connect to the database "' + config.database.name + '"');
		console.log('[!] Please check that the supplied config at "config.js" is correct & your MongoDB server is running');
		console.log('[!] ' + err + '\r\r');
	}
});

// Load mongoose models
fs.readdirSync('./server/models').forEach(function(filename){
	if(~filename.indexOf('.js')) require('./server/models/' + filename);
});

// HTTP listener
app.use(express.static('./client'));
console.log('\rJURF (Riot Games API Challenge) by Mohammadi El Youzghi (MohiX)\r\r');
app.listen(config.server.port, config.server.host, function(){
	console.log('[+] Server running on ' + config.server.host + ':' + config.server.port);
	console.log('[+] API KEY: ' + config.api.key);
	console.log('[+] API URL: ' + config.api.baseUrl);
	console.log('[+] STATIC DATA URL: ' + config.api.baseUrlStatic + '\r\r');
	console.log('[!] If any data is not correct, please edit config.js');
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
app.get('/stats/games/count', apicache('30 minutes'), apistats.gamesCount);
app.get('/stats/games/short', apicache('30 minutes'), apistats.shortGames);
app.get('/stats/games/long', apicache('30 minutes'), apistats.longGames);
app.get('/stats/champs/mostplayed', apicache('30 minutes'), apistats.mostPlayedChamps);
app.get('/stats/champs/lessplayed', apicache('30 minutes'), apistats.lessPlayedChamps);
app.get('/stats/champs/strong', apicache('30 minutes'), apistats.strongChamps);
app.get('/stats/champs/weak', apicache('30 minutes'), apistats.weakChamps);

// Cronjobs
// Retrieve URF Games info from Riot Games API & save it on local DB (only if enabled on config.js)
if (config.cron.running){
	var gamescron = require('./server/cronjobs/game');
	gamescron.run();
}