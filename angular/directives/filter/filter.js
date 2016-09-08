angular.module('app.directives')

.directive('filter', function($rootScope) {
	function link(scope, el, attrs) {
		
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/filter/filter.html',
		scope: {
			model: '=',
			filtered: '=',
		}
	}
})