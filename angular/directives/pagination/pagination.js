angular.module('app.directives')

.directive('pagination', function($state, $store, $auth, $queryString, $window) {
	function link(scope, el, attrs) {
		function calculate() {
			scope.pages = []
			scope.allpages = []
			var range = 2 // how many pages displayed either side of the current page
			var max = range * 2 + 1

			scope.last = Math.ceil(scope.total/scope.filter.limit)

			var start = scope.filter.page - range > 1 ? scope.filter.page - range : 1
			
			if(start > scope.last - max + 1) {
				start = scope.last - max + 1
			}

			start = start <= 1 ? 1 : start

			for(var i=start; i<scope.last+1; i++) {
				if(i > scope.filter.page - range && i < scope.filter.page + range || scope.pages.length < max) {
					scope.pages.push(i)
				}
			}

			for(var j=1; j<=scope.last; j++) {
				scope.allpages.push(j)
			}

			scope.current = scope.filter.page

			scope.atStart = scope.filter.page !== 1
			scope.atEnd = scope.filter.page + range <= (scope.total / scope.filter.limit)
		}

		scope.$watch('total', calculate)

		scope.$watch('filter', function(newVal) {
			scope.query = '&' + $queryString(_.omit(scope.filter, ['page']))

		}, true)

		scope.goto = function() {
			// #/bookings?page={{ last }}{{ query }}
			console.log('#/bookings?page=' + scope.current + scope.query)
			$window.location.href = '#/bookings?page=' + scope.current + scope.query
		}
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/pagination/pagination.html',
		scope: {
			total: '=',
			filter: '='
		}
	}
})