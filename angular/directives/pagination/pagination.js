angular.module('app.directives')

.directive('pagination', function($state, $store, $auth) {
	function link(scope, el, attrs) {
		function calculate() {
			scope.pages = []
			var range = 2 // how many pages displayed either side of the current page
			var max = range * 2 + 1

			scope.last = Math.ceil(scope.total/scope.filter.limit)

			var start = scope.current - range > 1 ? scope.current - range : 1
			
			if(start > scope.last - max + 1) {
				start = scope.last - max + 1
			}

			start = start <= 1 ? 1 : start

			for(var i=start; i<scope.last+1; i++) {
				if(i > scope.current - range && i < scope.current + range || scope.pages.length < max) {
					scope.pages.push(i)
				}
			}

			scope.atStart = scope.current !== 1
			scope.atEnd = scope.current + range <= (scope.total / scope.filter.limit)
		}

		scope.$watch('total', calculate)

		scope.$watch('filter', function(newVal) {
			scope.query = '&' + jQuery.param(_.omit(scope.filter, ['page']))
		}, true)
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/pagination/pagination.html',
		scope: {
			total: '=',
			current: '=',
			filter: '='
		}
	}
})