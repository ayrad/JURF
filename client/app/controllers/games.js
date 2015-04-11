(function () {
	var app = angular.module('urfApp');
	
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
})();