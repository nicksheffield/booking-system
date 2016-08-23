angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $state, $auth, $store, $location) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
		if(!toState.data) return
		if(!toState.data.conditions) return
			
		var conditions = toState.data.conditions

		var destination = null
		
		conditions.forEach(function(c) {
			if(c == 'auth') {
				if(!$auth.isAuthenticated()) {
					destination = '/login'
				}
			}
			
			if(c == 'staff_only') {
				if(!$auth.isAuthenticated()) {
					destination = '/login'
				} else if(!$store.user.admin) {
					destination = '/profile/' + $store.user.username
				}
			}
			
			if(c == 'student_only') {
				if(!$auth.isAuthenticated()) {
					destination = '/login'
				} else if($store.user.admin) {
					destination = '/profile/' + $store.user.username
				}
			}
			
			if(destination) {
				console.log('kicked')
				event.preventDefault()
				
				// $state.go(destination)
				$location.path(destination)
			}
		})
	})
})