angular.module('app.directives')

.directive('navLink', function($location, $state, $rootScope) {
	function link(scope, el, attrs) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
			render(toState)
		})
		
		function render(state) {
			if($location.path() == scope.url.replace('#','')) {
				el.addClass('current')
			} else {
				el.removeClass('current')
			}
			
			scope.crumbs = []
			
			getCrumbs(state)
			
			function getCrumbs(state) {
				if(state.data && state.data.crumb_parent) {
					scope.crumbs.push(state.data.crumb_parent)

					getCrumbs(state.data.crumb_parent)
				}
			}
			
			_.forEach(scope.crumbs, function(crumb) {
				if(scope.url.replace('#', '') == crumb.url) {
					el.addClass('current')
				}
			})
		}
		
		render($state.current)
	}

	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: link,
		templateUrl: 'directives/navLink/navLink.html',
		scope: {
			'navLink': '@',
			'url': '@',
			'icon': '@'
		}
	}
})