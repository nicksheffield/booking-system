angular.module('app.resources')

.factory('User', function($resource) {
	var url = '/api/user/:id'

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