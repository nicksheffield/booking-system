angular.module('app.directives')

.directive('sidebar', function($store, $state, $auth, $load, $location, $rootScope, $http) {
	function link(scope, el, attrs) {
		scope.auth = $auth
		scope.user = $store.user
		scope.store = $store

		$load.listen('user', function(user) {
			scope.user = user
			scope.loading_bookings = true

			// no idea if this little part actually works
			if(!$auth.isAuthenticated() && $state.current.data.conditions.indexOf('auth') !== -1) {
				$location.path('/')
			}
		})

		$load.listen('booking_count', function(res) {
			scope.bookings_count = parseInt(res.data.total)
			scope.loading_bookings = false
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