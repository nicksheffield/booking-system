angular.module('app.directives')

.directive('alert', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'directives/alert/alert.html',
		scope: {
			type: '@',
			text: '@',
			icon: '@',
		}
	}
})