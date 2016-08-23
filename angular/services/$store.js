angular.module('app.services')

.factory('$store', function($auth, User, Group, Group_Type) {
	var service = {
		user: {},
		users: {},
		groups: {},
		group_types: {}
	}
	
	if($auth.isAuthenticated()) {
		service.user = User.getWithToken()
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group'})
	}
	
	service.loadGroups = function() {
		service.groups = Group.query()
	}
	
	service.loadGroupTypes = function() {
		service.group_types = Group_Type.query()
	}
	
	service.loadUsers()
	service.loadGroups()

	return service
})