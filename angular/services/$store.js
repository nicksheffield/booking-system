angular.module('app.services')

.factory('$store', function($q, $auth, $interval, User, Group, Group_Type, Product_Type, Product, Unit, Booking) {
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
		invalidated: [],
		events: [],
	}
	
	// good for debugging, remove this later
	window.store = service
	
	service.invalidate = function(type) {
		if(type instanceof Array) {
			_.forEach(type, function(t) {
				if(service.invalidated.indexOf(t) === -1){
					service.invalidated.push(t)
				}
			})
		} else {
			service.invalidated.push(type)
		}
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
				case 'bookings': invalid.push(service.loadBookings().$promise); break;
				case 'group_types': invalid.push(service.loadGroupTypes().$promise); break;
				case 'product_types': invalid.push(service.loadProductTypes().$promise); break;
			}
		})

		// console.log('invalidated', invalid.length)
		
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
		
		service.user.$promise.then(userSetup).then(function() {
			service.notify('user', service.user)
		})
		
		return service.user
	}
	
	service.loadUsers = function() {
		service.users = User.query({'with': 'group|tutors_group'})
		
		service.users.$promise
			.then(function(users) {
				_.forEach(users, userSetup)
			})
			.then(function() {
				service.notify('users', service.users)
			})
		
		return service.users
	}
	
	function userSetup(user) {
		if(user.admin === 2) user._role = 'Manager'
		if(user.admin === 1) user._role = 'Staff'
		if(user.admin === 0) user._role = 'Student'
			
		var duration = moment.duration(moment().diff(moment(user.dob)));
		
		user._age = duration.asYears().toFixed(0)

		if(user.dob) user.dob = new Date(user.dob)
	}
	
	service.loadGroups = function() {
		service.groups = Group.query({'with': 'type|users|allowed_products|tutors'})
		
		service.groups.$promise.then(function() {
			service.notify('groups', service.groups)
		})
		
		return service.groups
	}
	
	service.loadGroupTypes = function() {
		service.group_types = Group_Type.query({'with': 'groups'})
		
		service.group_types.$promise.then(function() {
			service.notify('group_types', service.group_types)
		})
		
		return service.group_types
	}
	
	service.loadProductTypes = function() {
		service.product_types = Product_Type.query({'with': 'products'})
		
		service.product_types.$promise.then(function() {
			service.notify('product_types', service.product_types)
		})
		
		return service.product_types
	}
	
	service.loadProducts = function() {
		service.products = Product.query({'with': 'units|type|groups_allowed'})
		
		service.products.$promise.then(function(products) {
			_.forEach(products, function(product) {
				product._quantity = ''
			})
		})
		
		service.products.$promise.then(function() {
			service.notify('products', service.products)
		})
		
		return service.products
	}
	
	service.loadUnits = function() {
		service.units = Unit.query({'with': 'product'})
		
		service.units.$promise.then(function() {
			service.notify('units', service.units)
		})
		
		return service.units
	}
	
	service.loadBookings = function() {
		service.bookings = Booking.query({'with': 'products|user'})
		
		service.bookings.$promise
			.then(function(bookings) {
				_.forEach(bookings, function(booking) {
					booking.due_at = new Date(booking.due_at)
					booking.pickup_at = new Date(booking.pickup_at)
				})
			})
			.then(function() {
				service.notify('bookings', service.bookings)
			})
		
		return service.bookings
	}
	
	service.invalidate(['groups', 'users'])
	
	if($auth.isAuthenticated()) {
		service.invalidate(['user', 'group_types', 'product_types', 'products', 'units', 'bookings'])
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
	
	service.listen = function(event, callback) {
		service.events.push({
			name: event,
			callback: callback
		})
	}
	
	service.notify = function(eventName, things) {
		_.forEach(service.events, function(event) {
			if(event.name == eventName) {
				event.callback(things)
			}
		})
	}
	
	// invalidate everything every 5 minutes
	$interval(function() {
		service.invalidate(['user', 'users', 'groups', 'group_types', 'product_types', 'products', 'units', 'bookings'])
	}, 5 * 60 * 1000)

	return service
})