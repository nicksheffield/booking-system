angular.module('app.services')

.factory('$load', function($rootScope, $store, $prepare, $q, $auth, $timeout, User, Group, Group_Type, Product_Type, Product, Unit, Booking) {
	var service = {}
	var events = []
	
	service.user = function() {
		var resource = User.getWithToken()
		
		$store.user = resource
		
		resource.$promise
			.then($prepare.user)
			.then(service.notify('user'))
		
		return resource
	}
	
	service.users = function() {
		var resource = User.query({'with': 'group|tutors_group'})
		
		$store.users = resource
		
		resource.$promise
			.then($prepare.users)
			.then(service.notify('users'))
		
		return resource
	}
	
	service.group_types = function() {
		var resource = Group_Type.query({'with': 'groups'})
		
		$store.group_types = resource
		
		resource.$promise
			.then($prepare.group_types)
			.then(service.notify('group_types'))
		
		return resource
	}
	
	service.groups = function() {
		var query = {}
		
		if($store.user.admin) {
			query = {'with': 'type|users|allowed_products|tutors'}
		} else {
			query = {'with': 'allowed_products'}
		}
		
		var resource = Group.query(query)
		
		$store.groups = resource
		
		resource.$promise
			.then($prepare.groups)
			.then(service.notify('groups'))
		
		return resource
	}
	
	service.product_types = function() {
		var resource = Product_Type.query({'with': 'products'})
		
		$store.product_types = resource
		
		resource.$promise
			.then($prepare.product_types)
			.then(service.notify('product_types'))
		
		return resource
	}
	
	service.products = function() {
		var resource = Product.query({'with': 'units|type|groups_allowed'})
		
		$store.products = resource
		
		resource.$promise
			.then($prepare.products)
			.then(service.notify('products'))
		
		return resource
	}
	
	service.units = function() {
		var resource = Unit.query({'with': 'product'})
		
		$store.units = resource
		
		resource.$promise
			.then($prepare.units)
			.then(service.notify('units'))
		
		return resource
	}
	
	service.bookings = function() {
		var resource = Booking.query({'with': 'products|user'})
		
		$store.bookings = resource
		
		resource.$promise
			.then($prepare.bookings)
			.then(service.notify('bookings'))
		
		return resource
	}
	
	service.listen = function(event, callback) {
		events.push({
			name: event,
			callback: callback
		})
	}
	
	service.notify = function(eventName) {
		return (resource) => service.trigger(eventName, resource)
	}
	
	service.trigger = function(eventName, data) {
		_.forEach(events, function(event) {
			if(event.name == eventName) {
				event.callback(data)
			}
		})
	}
	
	return service
})