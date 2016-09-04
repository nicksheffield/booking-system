angular.module('app.services')

.factory('$message', function() {
	var service = {
		data: {},
		set: function(name, val) {
			service.data[name] = val
		},
		get: function(name) {
			return service.data[name]
		},
		flash: function(name) {
			var val = service.data[name]
			
			if(val) {
				delete service.data[name]
				return val
			} else {
				return undefined
			}
		}
	}

	return service
})