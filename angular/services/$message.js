angular.module('app.services')

.factory('$message', function() {
	var service = {}

	service.data = {}

	service.set = (name, val) => service.data[name] = val

	service.get = (name) => service.data[name]

	service.flash = function(name) {
		var val = service.data[name]
		
		if(val) {
			delete service.data[name]
			return val
		} else {
			return undefined
		}
	}

	return service
})