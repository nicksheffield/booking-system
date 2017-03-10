angular.module('app.filters')

.filter('page', function($filter) {
	return function(input, page, limit, trigger) {
		if(!trigger || trigger && input.length <= trigger) {
			return input
		} else {
			return $filter('limitTo')(input, limit, (page - 1) * limit)
		}
	}
})