angular.module('app.services')

.factory('$title', function($rootScope) {
	var service = function(title) {
		$rootScope.pageTitle = title + ' - Booking'
	}

	return service
})