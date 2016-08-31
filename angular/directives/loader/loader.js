angular.module('app.directives')

.directive('loader', function($rootScope) {
	function link(scope, el, attrs) {
		scope.loader = $rootScope.loader
	}

	return {
		restrict: 'E',
		replace: false,
		link: link,
		templateUrl: 'directives/loader/loader.html'
	}
})