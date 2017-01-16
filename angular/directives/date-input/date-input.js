angular.module('app.directives')

.directive('dateInput', function($rootScope) {
	function link(scope, el, attrs) {
		scope.dateOptions = {
			showWeeks: false,
			format: 'd MMM yyyy',
		}

		scope.open = false

		scope.toggle = function() {
			scope.open = !scope.open
		}
	}

	return {
		restrict: 'E',
		link: link,
		replace: true,
		templateUrl: 'directives/date-input/date-input.html',
		scope: {
			model: '=ngModel',
			change: '=ngChange'
		}
	}
})