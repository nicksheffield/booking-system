angular.module('app.services')

.factory('$title', function($rootScope) {
	var service = function(title) {
		$rootScope.pageTitle = title + ' - Quartermaster'
	}

	return service
})