angular.module('app.resources')

.factory('Product', function($resource) {
	var url = '/api/product/:id'

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