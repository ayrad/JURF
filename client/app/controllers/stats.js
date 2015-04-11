(function () {
	var app = angular.module('urfApp');
	
	app.controller('StatsCtrl', ['$scope', '$http', function ($scope, $http) {
		$http.get('/stats/games/count').success(function (response) {
			$scope.totalgames = response.count;
		});

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
	}]);


	function getGameDurations(game) {
		var minutes = Math.floor(game.matchDuration / 60);
		var seconds = game.matchDuration % 60;
		var seconds = ('0' + seconds).slice(-2);
		var durationMinSec = minutes + ':' + seconds;

		return {durationMinSec: durationMinSec, durationSec: game.matchDuration};
	};
})();