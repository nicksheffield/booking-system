angular.module('app.services')

.factory('$fetch', function() {
	var service = {
		'booking': function(id) {
			var resource = Booking.get(id)
			
			resource.$promise.then($prepare.booking)
			
			return resource
		}
	}

	return service
})