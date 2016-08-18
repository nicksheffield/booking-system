angular.module('app.resources')

.factory('Group', function($resource) {
	var url = '/api/group/:id'

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