angular.module('app.directives')

.directive('btn', function($state, $store, $auth) {
	function link(scope, el, attrs, ctrl, $transclude) {
		scope.small = attrs.small !== undefined ? true : false
		scope.large = attrs.large !== undefined ? true : false
		scope.spin = attrs.spin !== undefined ? true : false
		scope.circle = attrs.circle !== undefined ? true : false
		
		if(!scope.type) scope.type = 'primary'
		
		// http://stackoverflow.com/questions/21547781/detect-if-a-transclude-content-has-been-given-for-a-angularjs-directive
		$transclude(function(clone){
			if(clone.length){
				scope.hasTranscluded = true
			}
		})
	}

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		link: link,
		templateUrl: 'directives/btn/btn.html',
		scope: {
			icon: '@',
			type: '@',
			url: '@',
			disable: '='
		}
	}
})