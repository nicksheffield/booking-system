angular.module('app.resources')

.factory('Kit', function($resource) {
	var url = '/api/kit/:id'

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