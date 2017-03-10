angular.module('app.directives')

.directive('pager', function($state, $store, $auth, $queryString) {
	function link(scope, el, attrs) {
		var old = null;

		scope.getLimit = function() {
			return scope.filter ? 99 : scope.limit
		}

		function calculate() {
			scope.pages = []
			scope.allpages = []

			scope.current = scope.current ? scope.current : (old ? old : 1)

			var range = 2
			var max = range * 2 + 1

			scope.totalpages = Math.ceil((scope.filter ? scope.filtered.length : scope.data.length) / scope.getLimit())

			var start = scope.getCurrent() - range > 1 ? scope.getCurrent() - range : 1
			
			if(start > scope.totalpages - max + 1) {
				start = scope.totalpages - max + 1
			}

			start = start <= 1 ? 1 : start

			for(var i=start; i<=scope.totalpages; i++) {
				if(i > scope.getCurrent() - range && i < scope.getCurrent() + range || scope.pages.length < max) {
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

			scope.updateOld()
		}

		scope.updateOld = function() {
			if(scope.current === null) return
			
			old = scope.current
		}

		scope.getCurrent = function() {
			return scope.filter ? 1 : (scope.current ? scope.current : (old ? old : 1))
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