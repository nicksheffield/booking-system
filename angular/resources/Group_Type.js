angular.module('app.resources')

.factory('Group_Type', function($resource) {
	var url = '/api/group_type/:id'

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