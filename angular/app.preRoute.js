angular.module('app.auth')

.config(function($authProvider) {
	$authProvider.loginUrl = '/api/auth'
})

.run(function($rootScope, $q, $state, $auth, $store, $load, $invalidate, $location, $title, $pretend) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		event.preventDefault()
		
		if(toState.data && toState.data.title) {
			$title(toState.data.title)
		}

		// if($store.user && $store.user.new_user && toState.url !== '/set_password') {
		// 	console.log('no!')
		// 	$location.path('/set_password')
		// 	return
		// }
		
		$rootScope.bodyClass = 'page-' + toState.name
		
		var invalids = $invalidate.load()
		
		if(invalids.length) invalids.push($pretend.wait(1000))
		// invalids.push($pretend.wait(1000))
		
		$rootScope.loader = true
		
		$q.all(invalids)
			.then(function() {
				var conditions = toState.data && toState.data.conditions ? toState.data.conditions : []

				var redirectTo = null
				
				conditions.forEach(function(c) {
					if(c == 'auth') {
						if(!$auth.isAuthenticated()) {
							redirectTo = 'login'
						}
					}
					
					if(c == 'guest_only') {
						if($auth.isAuthenticated()) {
							redirectTo = 'home'
						}
					}
					
					if(c == 'manager_only') {
						if(!$auth.isAuthenticated()) {
							redirectTo = 'login'
						} else {
							if($auth.getPayload().admin !== 2) {
								redirectTo = 'home'
							}
						}
					}
					
					if(c == 'staff_only') {
						if(!$auth.isAuthenticated()) {
							redirectTo = 'login'
						} else {
							if(!$auth.getPayload().admin) {
								redirectTo = 'home'
							}
						}
					}
					
					if(c == 'student_only') {
						if(!$auth.isAuthenticated()) {
							redirectTo = 'login'
						} else {
							if($auth.getPayload().admin) {
								redirectTo = 'home'
							}
						}
					}
				})
				
				if(redirectTo) {
					console.log('kicked to', redirectTo)
					
					$rootScope.loader = false
					$location.path(redirectTo)
				}
				
				if(!redirectTo) {
					
					// https://github.com/angular-ui/ui-router/issues/1158
					$state.go(toState.name, toParams, {notify: false}).then(function() {
						$rootScope.loader = false
						$rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
					})
				}
				
			})
		
		
	})
})