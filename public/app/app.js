(function () {
	var app = angular.module('nurf', ['angular-loading-bar', 'ngAnimate', 'ngRoute', 'chart.js', 'nurfControllers']);

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
					when('/game/:gameId', {
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


	$('body').on('click', '.navbar-nav li', function () {
		$(this).parent().children('.active').removeClass('active');
		$(this).addClass('active');
	});
})($);