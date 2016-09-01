angular.module('app.services')

.factory('$store', function($q, $auth, User, Group, Group_Type, Product_Type, Product, Unit) {
	var service = {
		user: {},
		units: {},
		users: {},
		groups: {},
		booking: {},
		products: {},
		bookings: {},
		group_types: {},
		product_types: {},
		invalidated: []
	}
	
	window.store = service
	
	service.invalidate = function() {
		_.forEach(arguments, function(type) {
			if(service.invalidated.indexOf(type) === -1){
				service.invalidated.push(type)
			}
		})
	}
	
	service.loadInvalidated = function() {
		var invalid = []
		
		_.forEach(service.invalidated, function(i) {
			switch(i) {
				case 'user': invalid.push(service.loadAuthUser().$promise); break;
				case 'users': invalid.push(service.loadUsers().$promise); break;
				case 'units': invalid.push(service.loadUnits().$promise); break;
				case 'groups': invalid.push(service.loadGroups().$promise); break;
				case 'products': invalid.push(service.loadProducts().$promise); break;
				case 'group_types': invalid.push(service.loadGroupTypes().$promise); break;
				case 'product_types': invalid.push(service.loadProductTypes().$promise); break;
			}
		})

		console.log('invalidated', invalid.length)
		
		service.invalidated = []
		
		return invalid
	}
	
	service.setBooking = function(booking) {
		localStorage.booking = JSON.stringify(booking)
		service.booking = booking
	}
	
	service.resetBooking = function() {
		localStorage.removeItem('booking')
		service.booking = {}
	}
	
	service.get = function(type, id) {
		return _.find(service[type], (t) => t.id == id)
	}
	
	service.loadAuthUser = function() {
		service.user = User.getWithToken()
		
		service.user.$promise.then(userSetup)
		
		return service.user
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group|tutors_group'})
		
		service.users.$promise.then(function(users) {
			_.forEach(users, userSetup)
		})
		
		return service.users
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
		service.groups = Group.query({'with': 'type|users|allowed_products|tutors'})
		return service.groups
	}
	
	service.loadGroupTypes = function() {
		service.group_types = Group_Type.query({'with': 'groups'})
		return service.group_types
	}
	
	service.loadProductTypes = function() {
		service.product_types = Product_Type.query({'with': 'products'})
		return service.product_types
	}
	
	service.loadProducts = function() {
		service.products = Product.query({'with': 'units|type|groups_allowed'})
		
		service.products.$promise.then(function(products) {
			_.forEach(products, function(product) {
				product._quantity = ''
			})
		})
		
		return service.products
	}
	
	service.loadUnits = function() {
		service.units = Unit.query({'with': 'product'})
		
		return service.units
	}
	
	// service.loadGroups()
	// service.loadUsers()
	service.invalidate('groups', 'users')
	
	if($auth.isAuthenticated()) {
		service.invalidate('user', 'group_types', 'product_types', 'products', 'units')
	// 	service.loadAuthUser()
	// 	service.loadGroupTypes()
	// 	service.loadProductTypes()
	// 	service.loadProducts()
	// 	service.loadUnits()
	}
	
	if(localStorage.booking) {
		service.booking = JSON.parse(localStorage.booking)
		
		if(service.booking.pickup_at) {
			service.booking.pickup_at = new Date(service.booking.pickup_at)
		}
		
		if(service.booking.due_at) {
			service.booking.due_at = new Date(service.booking.due_at)
		}
	}

	return service
})