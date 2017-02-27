angular.module('app.services')

.factory('$store', function(Booking) {
	var service = {
		user: {},
		units: [],
		users: [],
		notes: [],
		groups: [],
		booking: {},
		products: [],
		bookings: [],
		group_types: [],
		product_types: [],
	}

	window.store = service
	
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