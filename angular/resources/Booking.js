angular.module('app.resources')

.factory('Booking', function($resource) {
	var url = '/api/booking/:id'

	var defaults = {
		'id': '@id'
	}

	var methods = {
		update: {
			method: 'PUT'
		}
	}

	return $resource(url, defaults, methods)
})