angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $state, $auth, $store) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
		if(!toState.data) return
		if(!toState.data.conditions) return
			
		var conditions = toState.data.conditions

		var destination = null
		
		conditions.forEach(function(c) {
			if(c == 'auth') {
				if(!$auth.isAuthenticated()) {
					destination = 'login'
				}
			}
			
			if(c == 'staff_only') {
				if(!$auth.isAuthenticated() || !$store.user.admin) {
					destination = '/'
				}
			}
			
			if(c == 'student_only') {
				if(!$auth.isAuthenticated() || $store.user.admin) {
					destination = '/'
				}
			}
			
			if(destination) {
				console.log('kicked')
				event.preventDefault()
				
				$state.go(destination)
			}
		})
	})
})