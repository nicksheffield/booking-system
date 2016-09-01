angular.module('app.services')

.factory('$pretend', function($q, $timeout) {
	var service = {
		wait: function(time) {
			var q = $q.defer()
			
			$timeout(function() {
				q.resolve()
			}, time)
			
			return q.promise
		}
	}

	return service
})