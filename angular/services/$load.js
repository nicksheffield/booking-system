angular.module('app.services')

.factory('$load', function($rootScope, $store, $prepare, $q, $timeout, User, Group, Group_Type, Product_Type, Product, Unit, Booking) {
	var service = {}
	var events = []
	
	service.all = function() {}
	
	service.user = function() {
		var resource = User.getWithToken()
		
		$store.user = resource
		
		resource.$promise
			.then($prepare.user)
			.then(function() {
				service.notify('user', resource)
			})
		
		return resource
	}
	
	service.users = function() {
		var resource = User.query({'with': 'group|tutors_group'})
		
		$store.users = resource
		
		resource.$promise
			.then($prepare.users)
			.then(function() {
				service.notify('users', resource)
			})
		
		return resource
	}
	
	service.group_types = function() {
		var resource = Group_Type.query({'with': 'groups'})
		
		$store.group_types = resource
		
		resource.$promise.then(function() {
			service.notify('group_types', resource)
		})
		
		return resource
	}
	
	service.groups = function() {
		var resource = Group.query({'with': 'type|users|allowed_products|tutors'})
		
		$store.groups = resource
		
		resource.$promise.then(function() {
			service.notify('groups', resource)
		})
		
		return resource
	}
	
	service.product_types = function() {
		var resource = Product_Type.query({'with': 'products'})
		
		$store.product_types = resource
		
		resource.$promise.then(function() {
			service.notify('product_types', resource)
		})
		
		return resource
	}
	
	service.products = function() {
		var resource = Product.query({'with': 'units|type|groups_allowed'})
		
		$store.products = resource
		
		resource.$promise
			.then($prepare.products)
			.then(function() {
				service.notify('products', resource)
			})
		
		return resource
	}
	
	service.units = function() {
		var resource = Unit.query({'with': 'product'})
		
		$store.units = resource
		
		resource.$promise.then(function() {
			service.notify('units', resource)
		})
		
		return resource
	}
	
	service.bookings = function() {
		var resource = Booking.query({'with': 'products|user'})
		
		$store.bookings = resource
		
		resource.$promise
			.then($prepare.bookings)
			.then(function() {
				service.notify('bookings', resource)
			})
		
		return resource
	}
	
	service.listen = function(event, callback) {
		events.push({
			name: event,
			callback: callback
		})
	}
	
	service.notify = function(eventName, things) {
		_.forEach(events, function(event) {
			if(event.name == eventName) {
				event.callback(things)
			}
		})
	}
	
	
	
	return service
})