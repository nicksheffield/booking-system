angular.module('app.directives')

.directive('alert', function() {
	function link(scope, el, attrs) {
		console.log('scope', scope)
	}

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		link: link,
		templateUrl: 'directives/alert/alert.html',
		scope: {
			type: '@',
			text: '@',
			icon: '@',
		}
	}
})