angular.module('app.services')

.factory('$store', function($auth, User, Group, Group_Type, Product_Type, Product, Unit) {
	var service = {
		user: {},
		users: {},
		groups: {},
		group_types: {},
		product_types: {},
		products: {},
		unit: {},
		booking: []
	}
	
	service.loadAuthUser = function() {
		service.user = User.getWithToken()
		
		service.user.$promise.then(userSetup)
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group'})
		
		service.users.$promise.then(function(users) {
			_.forEach(users, userSetup)
		})
	}
	
	function userSetup(user) {
		if(user.admin === 2) user._role = 'Manager'
		if(user.admin === 1) user._role = 'Staff'
		if(user.admin === 0) user._role = 'Student'

		user._fullname = user.first_name + ' ' + user.last_name
			
		var duration = moment.duration(moment().diff(moment(user.dob)));
		
		user._age = duration.asYears().toFixed(0)

		if(user.dob) user.dob = new Date(user.dob)
	}
	
	service.loadGroups = function() {
		service.groups = Group.query({'with': 'type|users|allowed_products'})
	}
	
	service.loadGroupTypes = function() {
		service.group_types = Group_Type.query({'with': 'groups'})
	}
	
	service.loadProductTypes = function() {
		service.product_types = Product_Type.query({'with': 'products'})
	}
	
	service.loadProducts = function() {
		service.products = Product.query({'with': 'units|type|groups_allowed'})
	}
	
	service.loadUnits = function() {
		service.units = Unit.query({'with': 'product'})
	}
	
	service.loadGroups()
	service.loadUsers()
	
	if($auth.isAuthenticated()) {
		service.loadAuthUser()
		service.loadGroupTypes()
		service.loadProductTypes()
		service.loadProducts()
		service.loadUnits()
	}

	return service
})