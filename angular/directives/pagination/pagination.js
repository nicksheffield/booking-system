angular.module('app.directives')

.directive('pagination', function($state, $store, $auth) {
	function link(scope, el, attrs) {
		scope.pages = []
		var range = 2
		var max = range*2+1

		var start = scope.current - range > 1 ? scope.current - range : 1

		scope.last = (scope.total/scope.perPage)

		for(var i=start; i<scope.last+1; i++) {
			if(i > scope.current - range && i < scope.current + range || scope.pages.length < max) {
				scope.pages.push(i)
			}
		}

		scope.atStart = start > 1
		scope.atEnd = scope.current + range <= (scope.total / scope.perPage)
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
			perPage: '='
		}
	}
})