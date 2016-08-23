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
		service.loadGroups()
		service.loadUsers()
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group'})
	}
	
	service.loadGroups = function() {
		service.groups = Group.query()
	}
	
	service.load()

	return service
})