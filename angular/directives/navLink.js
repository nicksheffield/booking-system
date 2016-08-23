angular.module('app.directives')

.directive('navLink', function($location, $state) {
	function link(scope, el, attrs){
		if($location.path() == scope.url.replace('#','')) {
			el.addClass('current')
		}
		
		if($state.current.data && $state.current.data.crumbs) {
			_.forEach($state.current.data.crumbs, function(crumb) {
				if(scope.url.replace('#', '') == crumb.url) {
					el.addClass('current')
				}
			})
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