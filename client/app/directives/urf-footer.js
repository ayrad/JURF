(function(){
	var app = angular.module('urfApp');
	app.directive('urfFooter', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/footer.html'
		};
	});
})();


