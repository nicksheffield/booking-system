angular.module('app.services')

.factory('$store', function($auth, User, Group) {
	var service = {
		user: {},
		users: {},
		groups: {}
	}
	
	if($auth.isAuthenticated()) {
		service.user = User.getWithToken()
	}
	
	service.load = function() {
		service.groups = Group.query()
		service.users = User.query()
	}
	
	service.load()

	return service
})