(function () {
	var app = angular.module('urfApp');
	app.directive('urfNavbar', function () {
		return {
			restrict: 'E',
			templateUrl: 'partials/navbar.html',
			controller: function ($scope, $location) {
				$scope.isActive = function (viewLocation) {
					var active = (viewLocation === $location.path());
					return active;
				};
			}
		};
	});
})();

