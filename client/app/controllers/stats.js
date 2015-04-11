(function () {
	var app = angular.module('urfApp');
	
	app.controller('StatsCtrl', ['$scope', '$http', function ($scope, $http) {
		// Total games
		$http.get('/stats/games/count').success(function (response) {
			$scope.totalgames = response.count;
		});

		// Champions
		$http.get('/stats/champs/mostplayed').success(function (response) {
			$scope.mostPlayedChampsData = [];
			$scope.mostPlayedChampsLabels = [];

			response.forEach(function (registry) {
				$http.get('/champ/' + registry._id).success(function (response) {
					$scope.mostPlayedChampsData.push(registry.times);
					$scope.mostPlayedChampsLabels.push(response.name);
				});
			});
		});

		// Damages
		$http.get('/stats/champs/lessplayed').success(function (response) {
			$scope.lessPlayedChampsData = [];
			$scope.lessPlayedChampsLabels = [];

			response.forEach(function (registry) {
				$http.get('/champ/' + registry._id).success(function (response) {
					$scope.lessPlayedChampsData.push(registry.times);
					$scope.lessPlayedChampsLabels.push(response.name);
				});
			});
		});
		
		var strongMagic = [];
		var strongPhysical = [];
		var strongTrue = [];

		$scope.strongChampsLabels = [];
		$scope.strongChampsData = [strongMagic, strongPhysical, strongTrue];
		$scope.damagesSeries = ['Magic', 'Physical', 'True'];
		
		$http.get('/stats/champs/strong').success(function(response){
			response.forEach(function(registry){
				$http.get('/champ/' + registry.champ).success(function (response) {
					$scope.strongChampsLabels.push(response.name + ' (' + registry.total/1000+ 'k)');
					strongMagic.push(registry.magic);
					strongPhysical.push(registry.physical);
					strongTrue.push(registry.true);
				});
			});
		});
		
		var weakMagic = [];
		var weakPhysical = [];
		var weakTrue = [];

		$scope.weakChampsLabels = [];
		$scope.weakChampsData = [weakMagic, weakPhysical, weakTrue];
		$http.get('/stats/champs/weak').success(function(response){
			response.forEach(function(registry){
				$http.get('/champ/' + registry.champ).success(function (response) {
					$scope.weakChampsLabels.push(response.name + ' (' + registry.total/1000+ 'k)');
					weakMagic.push(registry.magic);
					weakPhysical.push(registry.physical);
					weakTrue.push(registry.true);
				});
			});
		});
		
		// Game Duration
		$http.get('/stats/games/short').success(function (response) {
			$scope.shortGamesData = [];
			$scope.shortGamesLabels = [];
			response.forEach(function (game) {
				var durations = getGameDurations(game);

				$scope.shortGamesData.push(durations.durationSec);
				$scope.shortGamesLabels.push(durations.durationMinSec);
			});
		});

		$http.get('/stats/games/long').success(function (response) {
			$scope.longGamesData = [];
			$scope.longGamesLabels = [];
			response.forEach(function (game) {
				var durations = getGameDurations(game);

				$scope.longGamesData.push(durations.durationSec);
				$scope.longGamesLabels.push(durations.durationMinSec);
			});
		});
	}]);

	function getGameDurations(game) {
		var minutes = Math.floor(game.matchDuration / 60);
		var seconds = game.matchDuration % 60;
		var seconds = ('0' + seconds).slice(-2);
		var durationMinSec = minutes + ':' + seconds;

		return {durationMinSec: durationMinSec, durationSec: game.matchDuration};
	};
})();