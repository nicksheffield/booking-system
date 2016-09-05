angular.module('app.services')

.factory('$store', function($q, $auth, $interval, User, Group, Group_Type, Product_Type, Product, Unit, Booking, $prepare) {
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
	
	service.get = function(type, id) {
		return _.find(service[type], typeof id == 'object' && id !== null ? id : (t) => t.id == id)
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