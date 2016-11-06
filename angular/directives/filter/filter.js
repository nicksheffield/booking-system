angular.module('app.directives')

.directive('filter', function($rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directives/filter/filter.html',
		scope: {
			model: '=',
			filtered: '=',
		}
	}
})