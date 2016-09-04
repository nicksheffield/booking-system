angular.module('app.services')

.factory('$pretend', function($q, $timeout) {
	var service = {
		wait: function(time) {
			return $q(function(resolve, reject) {
				$timeout(function() {
					resolve()
				}, time)
			})
		}
	}

	return service
})