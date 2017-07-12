angular.module('app.services')

.factory('$load', function($prepare, $auth, $http, User, Group, Group_Type, Product_Type, Product, Unit, Booking, Note, Setting, Kit) {
	var service = {}
	var events = []
	
	service.user = function() {
		var resource = User.getWithToken()
		
		resource.$promise
			.then($prepare.user)
			.then(service.notify('user'))
		
		return resource
	}
	
	service.users = function() {
		var resource = User.query({'with': 'tutors_groups.type'})
		
		resource.$promise
			.then($prepare.users)
			.then(service.notify('users'))
		
		return resource
	}
	
	service.group_types = function() {
		var resource = Group_Type.query({with: 'products'})
		
		resource.$promise
			.then($prepare.group_types)
			.then(service.notify('group_types'))
		
		return resource
	}

	service.group_type = function(id) {
		var resource = Group_Type.get({id, with: 'products'})
		
		resource.$promise
			.then($prepare.group_type)
			.then(service.notify('group_type'))
		
		return resource
	}
	
	service.group = function(id) {
		var query = {'with': 'type'}
		
		if($auth.getPayload() && $auth.getPayload().admin) {
			query.with = 'tutors'
		}

		query.id = id
		
		var resource = Group.get(query)
		
		resource.$promise
			.then($prepare.group)
			.then(service.notify('group'))
		
		return resource
	}

	service.groups = function() {
		var query = {'with': 'type'}
		
		if($auth.getPayload() && $auth.getPayload().admin) {
			query.with = 'tutors'
		}
		
		var resource = Group.query(query)
		
		resource.$promise
			.then($prepare.groups)
			.then(service.notify('groups'))
		
		return resource
	}
	
	service.product_types = function() {
		var resource = Product_Type.query()
		
		resource.$promise
			.then($prepare.product_types)
			.then(service.notify('product_types'))
		
		return resource
	}
	
	service.products = function() {
		var resource = Product.query({'with': 'group_types|kits'})
		
		resource.$promise
			.then($prepare.products)
			.then(service.notify('products'))
		
		return resource
	}

	service.units = function () {
		var resource = Unit.query()

		resource.$promise
			.then($prepare.units)
			.then(service.notify('units'))

		return resource
	}


	service.unit = function(id, extra) {
		var resource = Unit.get({id: id, 'with': extra.with ? extra.with : undefined})

		resource.$promise
			.then($prepare.unit)
			.then(service.notify('unit'))

		return resource
	}

	service.booking = function(id) {
		var resource = Booking.get({id, 'with': 'products'})
		
		resource.$promise
			.then($prepare.booking)
			.then(service.notify('bookings'))
		
		return resource
	}
	
	service.bookings = function(limit, page) {
		var resource = Booking.query({limit, page, 'with': 'products'})
		
		resource.$promise
			.then($prepare.bookings)
			.then(service.notify('bookings'))
		
		return resource
	}
	
	service.notes = function() {
		var resource = Note.query({})
		
		resource.$promise
			.then($prepare.notes)
			.then(service.notify('notes'))
		
		return resource
	}

	service.booking_count = function() {
		var resource = $http.get('/api/booking/count')

		resource.then(service.notify('booking_count'))

		return resource
	}

	service.settings = function() {
		var resource = Setting.query()
		
		resource.$promise
			.then(service.notify('settings'))
		
		return resource
	}

	service.kits = function() {
		var resource = Kit.query()
		
		resource.$promise
			.then($prepare.kits)
			.then(service.notify('kits'))
		
		return resource
	}

	service.kit = function(id) {
		var resource = Kit.get({id, 'with': 'products'})
		
		resource.$promise
			.then($prepare.kit)
			.then(service.notify('kit'))
		
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