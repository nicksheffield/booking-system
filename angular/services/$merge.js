angular.module('app.services')

.factory('$merge', function($store) {
	var service = {}

	service.bookings = function(newBookings) {
		newBookings.forEach(function(booking) {
			if(!_.find($store.bookings, {id: booking.id})) {
				$store.bookings.push(booking)
			}
		})

		// sort by id
		$store.bookings.sort((a, b) => a.id - b.id)
	}

	return service
})