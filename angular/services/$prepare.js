angular.module('app.services')

.factory('$prepare', function() {
	var service = {}
	
	service.users = function(users) {
		_.forEach(users, service.user)
	}
	
	service.user = function(user) {
		if(user.admin === 2) user._role = 'Manager'
		if(user.admin === 1) user._role = 'Staff'
		if(user.admin === 0) user._role = 'Student'
			
		var duration = moment.duration(moment().diff(moment(user.dob)));
		
		user._age = duration.asYears().toFixed(0)

		if(user.dob) user.dob = new Date(user.dob)
	}

	service.products = function(products) {
		_.forEach(products, function(product) {
			product._quantity = ''
		})
	}
	
	service.bookings = function(bookings) {
		_.forEach(bookings, function(booking) {
			booking.due_at = new Date(booking.due_at)
			booking.pickup_at = new Date(booking.pickup_at)
		})
	}

	return service
})