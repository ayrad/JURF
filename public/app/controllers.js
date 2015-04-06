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
			/*$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
			 $scope.series = ['Series A', 'Series B'];
			 $scope.data = [
			 [65, 59, 80, 81, 56, 55, 40],
			 [28, 48, 40, 19, 86, 27, 90]
			 ];
			 $scope.onClick = function (points, evt) {
			 console.log(points, evt);
			 };*/
			
			$http.get('/stats/games/short').success(function(response){
				$scope.shortMatchesData = [];
				$scope.shortMatchesLabels = [];
				response.forEach(function(match){
					var durations = getMatchDurations(match);
					
					$scope.shortMatchesData.push(durations.durationSec);
					$scope.shortMatchesLabels.push(durations.durationMinSec);
				});
			});
			
			$http.get('/stats/games/long').success(function(response){
				$scope.longMatchesData = [];
				$scope.longMatchesLabels = [];
				response.forEach(function(match){
					var durations = getMatchDurations(match);
					
					$scope.longMatchesData.push(durations.durationSec);
					$scope.longMatchesLabels.push(durations.durationMinSec);
				});
			});
			/*
			$scope.champslabels = ["Sona", "Teemo", "Morgana"];
			$scope.champsdata = [500, 300, 100];*/
			
			$http.get('/stats/mostplayedchamps').success(function(response){
				console.log(response);
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
	
	function getMatchDurations(match){
		var minutes = Math.floor(match.matchDuration / 60);
		var seconds = match.matchDuration % 60;
		var seconds = ('0'+seconds).slice(-2);
		var durationMinSec = minutes + ':' + seconds;

		return {durationMinSec:durationMinSec, durationSec:match.matchDuration};
	};
})();