angular.module('app.resources')

.factory('Note', function($resource) {
	var url = '/api/note/:id'

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