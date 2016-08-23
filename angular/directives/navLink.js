angular.module('app.directives')

.directive('navLink', function($location) {
	function link(scope, el, attrs){
		if($location.path() == scope.url.replace('#','')) {
			el.addClass('current')
		}
	}

	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: link,
		template: '<a href="{{ url }}">{{ navLink }} <i ng-show="icon" class="fa fa-{{ icon }}"></i></a>',
		scope: {
			'navLink': '@',
			'url': '@',
			'icon': '@'
		}
	}
})