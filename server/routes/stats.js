var app = express(),
	api = require('../server/api/stats');
	
app.get('/stats/games/short', api.shortgames);
app.get('/stats/games/long', api.longgames);
app.get('/stats/games/count', api.gamescount);
app.get('/stats/champs/mostplayed', api.mostplayedchamps);
app.get('/stats/champs/lessplayed', api.lessplayedchamps);
