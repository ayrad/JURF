(function () {
	// Main module definition
	var app = angular.module('urfApp', ['angular-loading-bar', 'ngAnimate', 'ngRoute', 'chart.js']);

	// Routes
	app.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.
					when('/', {
						templateUrl: 'partials/games-list.html',
						controller: 'LatestGamesCtrl'
					}).
					when('/latestgames', {
						templateUrl: 'partials/games-list.html',
						controller: 'LatestGamesCtrl'
					}).
					when('/latestgames/:gameId', {
						templateUrl: 'partials/game-details.html',
						controller: 'GameDetailCtrl'
					}).
					when('/stats', {
						templateUrl: 'partials/stats.html',
						controller: 'StatsCtrl'
					}).
					otherwise({
						redirectTo: '/'
					});
		}]);
})($);