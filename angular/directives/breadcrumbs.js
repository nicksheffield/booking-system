angular.module('app.directives')

.directive('breadcrumbs', function($state, $location, $stateParams) {
	function link(scope, el, attrs) {
		scope.state = $state
		scope.current_url = $location.path()
		
		scope.fix = function(url) {
			if(url.indexOf(':') != -1) {
				return url
					.split('/')
					.map(function(segment) {
						if(segment[0] != ':') {
							return segment
						} else {
							if($stateParams[segment.slice(1)]) {
								return $stateParams[segment.slice(1)]
							} else {
								return segment
							}
						}
					})
					.join('/')
			} else {
				return url
			}
		}
	}

	return {
		restrict: 'E',
		replace: false,
		transclude: false,
		link: link,
		templateUrl: 'views/breadcrumbs.html',
		scope: {}
	}
})