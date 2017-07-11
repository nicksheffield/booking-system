angular.module('app.services')

.factory('$store', function(Booking) {
	var service = {
		user: {},
		kits: [],
		units: [],
		users: [],
		notes: [],
		groups: [],
		booking: {},
		settings: [],
		products: [],
		bookings: [],
		group_types: [],
		product_types: [],
		booking_count: 0
	}

	window.$store = service
	
	service.setBooking = function(booking) {
		localStorage.booking = JSON.stringify(booking)
		service.booking = booking
	}
	
	service.resetBooking = function() {
		localStorage.removeItem('booking')
		service.booking = {}
	}

	service.clear = function(things) {
		if(things instanceof Array) {
			_.forEach(things, function(thing) {
				service[thing] = {}
			})
		} else {
			service[things] = {}
		}
	}
	
	service.get = function(type, id) {
		var item = _.find(service[type], typeof id == 'object' && id !== null ? id : {id: parseInt(id)})

		return item
	}

	service.filter = function(type, expression) {
		var items = _.filter(service[type], typeof expression == 'object' && expression !== null ? expression : expression())

		return items
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