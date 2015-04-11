var exports = module.exports = {};
exports.run = function(){
	var fs = require('fs');
	var config = JSON.parse(fs.readFileSync('./config.json'));
	var request = require('request');
	var mongoose = require('mongoose');
	var CronJob = require('cron').CronJob;
	var lastEpoch = 0;
	new CronJob('* * * * * *', function () {
		var epoch = getEpoch();
		if (epoch != lastEpoch) {
			var url = config.api + 'euw' + '/v4.1/game/ids?beginDate=' + epoch + '&api_key=' + config.apikey;
			console.log('GET EXTERNAL ' + url);

			request(url, function (err, apires, body) {
				if (!err && apires.statusCode === 200) {
					var gamesIds = JSON.parse(body);
					gamesIds.forEach(function (gameId) {
						var url = config.api + 'euw' + '/v2.2/match/' + gameId + '?api_key=' + config.apikey;
						console.log('GET EXTERNAL ' + url);
						request(url, function (err, apires, body) {
							if (!err && apires.statusCode === 200) {
								var resgame = JSON.parse(body);
								mongoose.model('games').count({matchId: resgame.matchId}, function (err, count) {
									if (!count) {
										var Game = mongoose.model('games');
										var game = new Game({
											matchId: resgame.matchId,
											matchCreation: resgame.matchCreation,
											matchDuration: resgame.matchDuration,
											mapId: resgame.mapId,
											matchVersion: resgame.matchVersion,
											participants: []
										});

										var Participant = mongoose.model('participant');
										resgame.participants.forEach(function (resparticipant) {
											var participant = new Participant({
												championId: resparticipant.championId,
												highestAchievedSeasonTier: resparticipant.highestAchievedSeasonTier,
												spell1Id: resparticipant.spell1Id,
												spell2Id: resparticipant.spell2Id,
												lane: resparticipant.timeline.lane,
												winner: resparticipant.stats.winner,
												champLevel: resparticipant.stats.champLevel,
												item0: resparticipant.stats.item0,
												item1: resparticipant.stats.item1,
												item2: resparticipant.stats.item2,
												item3: resparticipant.stats.item3,
												item4: resparticipant.stats.item4,
												item5: resparticipant.stats.item5,
												item6: resparticipant.stats.item6,
												kills: resparticipant.stats.kills,
												deaths: resparticipant.stats.deaths,
												assists: resparticipant.stats.assists,
												doubleKills: resparticipant.stats.doubleKills,
												tripleKills: resparticipant.stats.tripleKills,
												quadraKills: resparticipant.stats.quadraKills,
												pentaKills: resparticipant.stats.pentaKills,
												minionsKilled: resparticipant.stats.minionsKilled,
												goldEarned: resparticipant.stats.goldEarned,
												goldSpent: resparticipant.stats.goldSpent,
												goldLeft: resparticipant.stats.goldEarned - resparticipant.stats.goldSpent,
												magicDamageDealtToChampions: resparticipant.stats.magicDamageDealtToChampions,
												physicalDamageDealtToChampions: resparticipant.stats.physicalDamageDealtToChampions,
												trueDamageDealtToChampions: resparticipant.stats.trueDamageDealtToChampions,
												magicDamageDealt: resparticipant.stats.magicDamageDealt,
												physicalDamageDealt: resparticipant.stats.physicalDamageDealt,
												trueDamageDealt: resparticipant.stats.trueDamageDealt,
												magicDamageTaken: resparticipant.stats.magicDamageTaken,
												physicalDamageTaken: resparticipant.stats.physicalDamageTaken,
												trueDamageTaken: resparticipant.stats.trueDamageTaken
											});

											game.participants.push(participant);
										});

										game.save(function (err) {
											if (err)
												console.log('Could not save ' + game.matchId + ' game: ' + err);
										});
									} else {
										console.log('INSERT ERROR: Game ' + resgame.matchId + ' already exists');
									}
								});
							}
						});
					});
				}
			});
			lastEpoch = epoch;
		}
	}, null, true, 'America/Los_Angeles');
	
	
	function getEpoch(){
		var date = new Date(),
			timeoffset = 5;

		var getTimebreaks = function(timeoffset){
			var timebreaks = [];
			for (var i=0; i<=59; i += timeoffset) {
				timebreaks.push(i);
			}
			return timebreaks;
		};

		var timebreaks = getTimebreaks(timeoffset);
		var minutes = timebreaks[Math.floor(date.getMinutes() / timeoffset)];

		date.setMinutes(minutes);
		date.setSeconds(0);
		date.setMilliseconds(0);
		var epoch = (date.getTime()/1000) - (timeoffset * 2 * 60);
		return epoch;	
	};
};