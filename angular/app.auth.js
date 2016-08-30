angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $state, $auth, $store, $location, $title) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
		
		if(!toState.data) return
		
		if(toState.data.title) {
			$title(toState.data.title)
		}
			
		if(!toState.data.conditions) return
			
		var conditions = toState.data.conditions

		var destination = null
		
		conditions.forEach(function(c) {
			if(c == 'auth') {
				if(!$auth.isAuthenticated()) {
					destination = 'login'
				}
			}
			
			if(c == 'guest_only') {
				if($auth.isAuthenticated()) {
					destination = 'home'
				}
			}
			
			if(c == 'manager_only') {
				if(!$auth.isAuthenticated()) {
					destination = 'login'
				} else{
					$store.user.$promise.then(function() {
						if(!$store.user.staff == 2) {
							destination = 'home'
						}
					})
				}
			}
			
			if(c == 'staff_only') {
				if(!$auth.isAuthenticated()) {
					destination = 'login'
				} else{
					$store.user.$promise.then(function() {
						if(!$store.user.staff == 1) {
							destination = 'home'
						}
					})
				}
			}
			
			if(c == 'student_only') {
				if(!$auth.isAuthenticated()) {
					destination = 'login'
				} else{
					$store.user.$promise.then(function() {
						if($store.user.staff = 0) {
							destination = 'home'
						}
					})
				}
			}
			
			if(destination) {
				console.log('kicked to', destination)
				event.preventDefault()
				
				$state.go(destination)
				
				// $location.path(destination)
			}
		})
	})
})