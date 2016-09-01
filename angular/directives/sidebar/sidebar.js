angular.module('app.directives')

.directive('sidebar', function($store, $auth, $rootScope) {
	function link(scope, el, attrs) {
		scope.auth = $auth
		scope.user = $store.user
		
		$store.listen('user', function() {
			scope.user = $store.user
		})
	}

	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		link: link,
		templateUrl: 'directives/sidebar/sidebar.html',
		scope: {}
	}
})