angular.module('app.directives')

.directive('pageHeader', function($rootScope) {
	function link(scope, el, attrs) {
		scope.showBreadcrumbs = scope.breadcrumbs !== undefined ? scope.breadcrumbs : true
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		transclude: true,
		templateUrl: 'directives/pageHeader/pageHeader.html',
		scope: {
			text: '@',
			breadcrumbs: '=',
			count: '='
		}
	}
})