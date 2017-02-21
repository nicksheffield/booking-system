angular.module('app.services')

.factory('$queryString', function($store) {
	
	var service = function(obj, begin) {
		var str = ''

		for(var prop in obj) {
			var val = obj[prop]

			if(val === false || val === '' || val === undefined || val === null) continue
			if(prop === 'page' && val === 1) continue

			if(val === true) val = 'true'
			if(val instanceof Date) val = val.valueOf()

			str += prop + '=' + val + '&'
		}

		return str.length ? (begin ? '?' : '') + str.substring(0, str.length - 1) : ''
	}

	return service
})