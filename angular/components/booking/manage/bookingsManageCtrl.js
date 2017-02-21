angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare, $bookingFilter, $window, $queryString) {
	window.scope = $scope

	$scope.users = $store.users
	$scope.groups = $store.groups

	$bookingFilter.applyParams($stateParams)

	// --------------------------------------------------------------------------------
	// Filter
	// --------------------------------------------------------------------------------

	$scope.filter = $bookingFilter

	$scope.applyFilter = function() {
		$bookingFilter.apply()
		// $location.path('/bookings').search($bookingFilter.options)
		$window.location.href = '#/bookings' + $queryString($bookingFilter.options, true)
	}

	$scope.clearFilter = function() {
		$bookingFilter.clear()
		$window.location.href = '#/bookings'
	}

	$scope.clearUser = function() {
		$bookingFilter.inDOM.user = undefined
	}

	// --------------------------------------------------------------------------------
	// Pagination
	// --------------------------------------------------------------------------------

	$scope.limit = $bookingFilter.options.limit
	$scope.total = 0


	function getCount() {
		var options = {}

		if(!$store.user.admin) options.user_id = $store.user.id

		options = _.merge(options, $bookingFilter.options)

		$http.get('/api/booking/count', {params: options}).then(response => $scope.total = response.data.total)
	}

	getCount()
	


	// --------------------------------------------------------------------------------
	// Bookings
	// --------------------------------------------------------------------------------

	var query = {
		limit: $bookingFilter.options.limit,
		offset: $bookingFilter.options.limit * ($bookingFilter.options.page - 1),
		with: 'products'
	}

	query = _.merge(query, $bookingFilter.options)

	$scope.bookings = Booking.query(query)

	$scope.bookings.$promise
		.then($prepare.bookings)
		.then(bookings => $merge.bookings(bookings))

	// --------------------------------------------------------------------------------
	// Dates
	// --------------------------------------------------------------------------------

	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
	}
	
	$scope.openAfterDate = function() {
		$scope.openAfterDateControl = $scope.openAfterDateControl ? false : true
		$scope.filterUseAfterDate = true
	}
	
	$scope.openBeforeDate = function() {
		$scope.openBeforeDateControl = $scope.openBeforeDateControl ? false : true
		$scope.filterUseBeforeDate = true
	}

})