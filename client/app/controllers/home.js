(function () {
	var app = angular.module('urfApp');
	
	app.controller('HomeCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
		$http.get('/stats/games/count').success(function (response) {
			$scope.totalgames = response.count;
		});
		
		$http.get('/stats/champs/mostplayed').success(function (response) {
			$scope.kings = [];
			
			response = $filter('orderBy')(response, 'times');
			response = $filter('limitTo')(response, '-3');
			
			response.forEach(function (king, index) {
				$http.get('/champ/' + king._id).success(function (response) {
					king['champ'] = response;
					$scope.kings.push(king);
					
					if (index === 2){
						$scope.king = $scope.kings[2];
						$scope.silver = $scope.kings[1];
						$scope.bronze = $scope.kings[0];
					}
				});
			});
		});
	}]);
})();