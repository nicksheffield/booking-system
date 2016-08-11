angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

/*
resolve: {
	security: function($q, $store, $auth){
		if(!$auth.isAuthenticated() || !$store.user.admin){
			console.log('fo')
			return $q.reject("Not Authorized");
		}
	}
}
*/

.run(function($rootScope, $state, $auth, $store) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
		if(!toState.data) return
		if(!toState.data.conditions) return
			
		var conditions = toState.data.conditions

		var pass = true
		var destination = ''
		
		conditions.forEach(function(c) {
			if(c == 'auth') {
				if(!$auth.isAuthenticated()) {
					pass = false
					destination = 'login'
				}
			}
			
			if(!pass) {
				console.log('kicked')
				event.preventDefault()
				
				if(destination) {
					$state.go(destination)
				}
			}
		})
	})
})