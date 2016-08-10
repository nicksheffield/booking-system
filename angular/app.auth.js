angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $state, $auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		if (!toState.data) return

		if (toState.data.requireLogin && !$auth.isAuthenticated()) {
			console.log('kickout')
			$state.go('login')
			event.preventDefault()
		}
	})
})