(function () {
	var app = angular.module('urfApp');
	
	app.controller('HomeCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
		$http.get('/stats/games/count').success(function (response) {
			$scope.totalgames = response.count;
		});
		
		$scope.king = {};
		$scope.silver = {};
		$scope.bronze = {};
					
		$http.get('/stats/champs/mostplayed')
				.then(function (response) {
					var kings = response.data;
			
					kings = $filter('orderBy')(kings, 'times');
					kings = $filter('limitTo')(kings, '-3');
					
					return kings;
				})
				.then(function (kings) {
					kings.forEach(function (king) {
						$http.get('/champ/' + king._id).success(function (response) {
							king['champ'] = response;
						});
					});
					return kings;
				})
				.then(function (kings) {
					$scope.king = kings[2];
					$scope.silver = kings[1];
					$scope.bronze = kings[0];

					return true;
				});
	}]);
})();