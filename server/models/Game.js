var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var participantSchema = new Schema({
	championId : Number,
	highestAchievedSeasonTier : String,
	spell1Id : Number,
	spell2Id : Number,
	lane : String,
	winner : Boolean,
	champLevel : Number,
	item0 : Number,
	item1 : Number,
	item2 : Number,
	item3 : Number,
	item4 : Number,
	item5 : Number,
	item6 : Number,
	kills : Number,
	deaths : Number,
	assists : Number,
	doubleKills : Number,
	tripleKills : Number,
	quadraKills : Number,
	pentaKills: Number,
	minionsKilled : Number,
	goldEarned : Number,
	goldSpent : Number,
	goldLeft : Number,
	magicDamageDealtToChampions : Number,
	physicalDamageDealtToChampions : Number,
	trueDamageDealtToChampions : Number,
	magicDamageDealt : Number,
	physicalDamageDealt : Number,
	trueDamageDealt : Number,
	magicDamageTaken : Number,
	physicalDamageTaken : Number,
	trueDamageTaken : Number
	
});

var gamesSchema = new Schema({
	matchId : Number,
	matchCreation : Number,
	matchDuration : Number,
	mapId : Number,
	matchVersion : String,
	participants : [participantSchema]
});

mongoose.model('participant', participantSchema);
mongoose.model('games', gamesSchema);