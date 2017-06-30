angular.module('app.resources')

.factory('Setting', function($resource) {
	var url = '/api/setting/:id'

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