angular.module('app.directives')

.directive('pagination', function($state, $store, $auth) {
	function link(scope, el, attrs) {
		function calculate() {
			scope.pages = []
			var range = 2 // how many pages displayed either side of the current page
			var max = range * 2 + 1

			scope.last = Math.ceil(scope.total/scope.perPage)

			var start = scope.current - range > 1 ? scope.current - range : 1

			if(start > scope.last - max + 1) {
				start = scope.last - max + 1
			}

			for(var i=start; i<scope.last+1; i++) {
				if(i > scope.current - range && i < scope.current + range || scope.pages.length < max) {
					scope.pages.push(i)
				}
			}

			scope.atStart = start > 1
			scope.atEnd = scope.current + range <= (scope.total / scope.perPage)
		}

		scope.$watch('total', calculate)

		scope.$watch('filters', function(newVal) {
			var val = _.clone(newVal)

			val.before = new Date(val.before).valueOf()
			val.after  = new Date(val.after).valueOf()

			scope.query = '&' + jQuery.param(val)
		})
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/pagination/pagination.html',
		scope: {
			click: '=',
			total: '=',
			current: '=',
			perPage: '=',
			filters: '='
		}
	}
})