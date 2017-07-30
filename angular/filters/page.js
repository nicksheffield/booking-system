angular.module('app.filters')

.filter('page', function($filter) {
	return function(input, page, limit) {
		return $filter('limitTo')(input, limit, (page - 1) * limit)
	}
})