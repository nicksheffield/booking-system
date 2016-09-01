angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $urlRouter, $q, $state, $auth, $store, $location, $title, $timeout) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		event.preventDefault()
		
		if(toState.data && toState.data.title) {
			$title(toState.data.title)
		}
		
		var invalids = $store.loadInvalidated()
		
		$rootScope.loader = true
		
		$q.all(invalids)
			.then(function() {
				var conditions = toState.data && toState.data.conditions ? toState.data.conditions : []

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
							if($store.user._role !== 'Manager') {
								destination = 'home'
							}
						}
					}
					
					if(c == 'staff_only') {
						if(!$auth.isAuthenticated()) {
							destination = 'login'
						} else{
							$store.user.$promise.then(function() {
								if($store.user._role !== 'Staff') {
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
								if($store.user._role !== 'Student') {
									destination = 'home'
								}
							})
						}
					}
				})
				
				if(destination) {
					console.log('kicked to', destination)
					
					$rootScope.loader = false
					$location.path(destination)
				}
				
				if(!destination) {
					
					// https://github.com/angular-ui/ui-router/issues/1158
					$state.go(toState.name, toParams, {notify: false}).then(function() {
						$rootScope.loader = false
						$rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
					})
				}
				
			})
		
		
	})
})