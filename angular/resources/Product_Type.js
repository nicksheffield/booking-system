angular.module('app.resources')

.factory('Product_Type', function($resource) {
	var url = '/api/product_type/:id'

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