angular.module('app.services')

.factory('$flash', function() {
	var service = {
		data: {},
		set: function(name, val) {
			service.data[name] = val
		},
		use: function(name) {
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