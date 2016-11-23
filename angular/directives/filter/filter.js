angular.module('app.directives')

.directive('filter', function($rootScope) {
	function link(scope, el, attrs) {
		window.onkeyup = function(e) {
			if(e.which == 70 && e.ctrlKey === true) {
				console.log('do the thing')
				el.find('input').focus()
			}
		}
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