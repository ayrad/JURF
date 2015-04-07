(function () {
	var app = angular.module('nurfControllers', []);
	
	// Custom filters
	app.filter('capitalize', function() {
		return function(input, scope) {
			return input.substring(0,1).toUpperCase()+input.substring(1);
		};
	});
	
	// Custom directives
	app.directive('urfNavbar', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/navbar.html'
		};
	});
	
	app.directive('urfFooter', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/footer.html'
		};
	});
	
	// Controllers
	app.controller('LatestGamesCtrl', ['$scope', '$http', function($scope, $http){
		$http.get('/games/latest').success(function(response){
			$scope.games = response;
			$scope.games.forEach(function (game) {
				addExtrafields(game, $http);
			});
		});
	}]);

	app.controller('GameDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		$http.get('/game/' + $routeParams.gameId).success(function(response){
			$scope.game = addExtrafields(response, $http);
		});
	}]);

	app.controller('StatsCtrl', ['$scope', '$http', function ($scope, $http) {
			$http.get('/stats/games/count').success(function(response){
				$scope.totalgames = response.count;
			});
	
			$http.get('/stats/games/short').success(function(response){
				$scope.shortGamesData = [];
				$scope.shortGamesLabels = [];
				response.forEach(function(game){
					var durations = getGameDurations(game);
					
					$scope.shortGamesData.push(durations.durationSec);
					$scope.shortGamesLabels.push(durations.durationMinSec);
				});
			});
			
			$http.get('/stats/games/long').success(function(response){
				$scope.longGamesData = [];
				$scope.longGamesLabels = [];
				response.forEach(function(game){
					var durations = getGameDurations(game);
					
					$scope.longGamesData.push(durations.durationSec);
					$scope.longGamesLabels.push(durations.durationMinSec);
				});
			});
			
			$http.get('/stats/champs/mostplayed').success(function(response){
				$scope.mostPlayedChampsData = [];
				$scope.mostPlayedChampsLabels = [];
				
				response.forEach(function(registry){
					$http.get('/champ/' + registry._id).success(function(response){
						$scope.mostPlayedChampsData.push(registry.times);
						$scope.mostPlayedChampsLabels.push(response.name);
					});
				});
			});
			
			$http.get('/stats/champs/lessplayed').success(function(response){
				$scope.lessPlayedChampsData = [];
				$scope.lessPlayedChampsLabels = [];
				
				response.forEach(function(registry){
					$http.get('/champ/' + registry._id).success(function(response){
						$scope.lessPlayedChampsData.push(registry.times);
						$scope.lessPlayedChampsLabels.push(response.name);
					});
				});
			});
		}]);

	// Auxilliary functions
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
	
	function addExtrafields(game, $http){
		game.participants.forEach(function(participant){
			$http.get('/champ/' + participant.championId).success(function(response){
				participant['champ'] = response;
			});

			participant['spells'] = [];

			$http.get('/spell/' + participant.spell1Id).success(function(response){
				participant.spells.push(response);
			});

			$http.get('/spell/' + participant.spell2Id).success(function(response){
				participant.spells.push(response);
			});
		});
		
		return game;
	};
	
	function getGameDurations(game){
		var minutes = Math.floor(game.matchDuration / 60);
		var seconds = game.matchDuration % 60;
		var seconds = ('0'+seconds).slice(-2);
		var durationMinSec = minutes + ':' + seconds;

		return {durationMinSec:durationMinSec, durationSec:game.matchDuration};
	};
})();