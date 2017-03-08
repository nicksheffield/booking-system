angular.module('app.directives')

.directive('pager', function($state, $store, $auth, $queryString) {
	function link(scope, el, attrs) {
		function calculate() {
			scope.pages = []
			scope.allpages = []

			scope.current = scope.current ? scope.current : 1

			var range = 2
			var max = range * 2 + 1

			scope.totalpages = Math.ceil((scope.filter ? scope.filtered.length : scope.data.length) / scope.limit)

			var start = scope.current - range > 1 ? scope.current - range : 1
			
			if(start > scope.totalpages - max + 1) {
				start = scope.totalpages - max + 1
			}

			start = start <= 1 ? 1 : start

			for(var i=start; i<=scope.totalpages; i++) {
				if(i > scope.current - range && i < scope.current + range || scope.pages.length < max) {
					scope.pages.push(i)
				}
			}

			for(var j=1; j<=scope.totalpages; j++) {
				scope.allpages.push(j)
			}
		}

		scope.$watch('data', calculate)
		scope.$watch('current', calculate)
		scope.$watch('filter', calculate)

		scope.setCurrent = function(val) {
			scope.current = val
		}
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/pager/pager.html',
		scope: {
			current: '=',
			limit: '=',
			data: '=',
			filtered: '=',
			filter: '='
		}
	}
})