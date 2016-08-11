angular.module('app.services')

.factory('$store', function($auth, User) {
	var service = {
		user: {}
	}
	
	if($auth.isAuthenticated()) {
		service.user = User.getWithToken()
	}

	return service
})