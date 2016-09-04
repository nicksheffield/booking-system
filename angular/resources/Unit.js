angular.module('app.resources')

.factory('Unit', function($resource) {
	var url = '/api/unit/:id'

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