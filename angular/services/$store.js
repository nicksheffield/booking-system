angular.module('app.services')

.factory('$store', function($auth, User, Group, Group_Type, Product_Type, Product, Unit) {
	var service = {
		user: {},
		users: {},
		groups: {},
		group_types: {},
		product_types: {},
		products: {},
		unit: {}
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
	
	service.loadProductTypes = function() {
		service.product_types = Product_Type.query({'with': 'products'})
	}
	
	service.loadProducts = function() {
		service.products = Product.query({'with': 'units|type'})
	}
	
	service.loadUnits = function() {
		service.units = Unit.query({'with': 'product'})
	}
	
	service.loadUsers()
	service.loadGroups()
	
	if($auth.isAuthenticated()) {
		service.user = User.getWithToken()
		service.loadGroupTypes()
		service.loadProductTypes()
		service.loadProducts()
		service.loadUnits()
	}

	return service
})