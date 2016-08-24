angular.module('app.services')

.factory('$store', function($auth, User, Group, Group_Type) {
	var service = {
		user: {},
		users: {},
		groups: {},
		group_types: {}
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group'})
	}
	
	service.loadGroups = function() {
		service.groups = Group.query({'with': 'type|users'})
	}
	
	service.loadGroupTypes = function() {
		service.group_types = Group_Type.query({'with': 'groups'})
	}
	
	service.loadUsers()
	service.loadGroups()
	
	if($auth.isAuthenticated()) {
		service.user = User.getWithToken()
		service.loadGroupTypes()
	}

	return service
})