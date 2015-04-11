var app = express(),
	api = require('../server/api/matches');

app.get('/games/latest', api.latestgames);
//app.get('/games', api.allgames);
app.get('/game/:id', apicache('1 day'), api.gameById);
app.get('/champ/:id', apicache('1 week'), api.champById);
app.get('/spell/:id', apicache('1 week'), api.spellById);