angular.module('app.directives')

.directive('sidebar', function($store, $auth, $load, $rootScope) {
	function link(scope, el, attrs) {
		scope.auth = $auth
		scope.user = $store.user
		
		$load.listen('user', function(user) {
			scope.user = user
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