angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare, $bookingFilter, $window) {
	window.scope = $scope

	console.log('$bookingFilter', $bookingFilter)

	// --------------------------------------------------------------------------------
	// Filter
	// --------------------------------------------------------------------------------

	$scope.filter = $bookingFilter

	$scope.applyFilter = function() {
		$bookingFilter.apply()
		$location.path('/bookings').search($bookingFilter.options)
		// $window.location.href = '#/bookings?' + jQuery.param($bookingFilter.options)
	}

	// --------------------------------------------------------------------------------
	// Pagination
	// --------------------------------------------------------------------------------

	$scope.current = parseInt($stateParams.page) || 1
	$scope.limit = $bookingFilter.options.limit
	$scope.total = 0


	function getCount() {
		var options = {}

		if(!$store.user.admin)          options.user_id = $store.user.id

		options = _.merge(options, $bookingFilter.options)

		$http.get('/api/booking/count', {params: options}).then(response => $scope.total = response.data.total)
	}

	getCount()
	


	// --------------------------------------------------------------------------------
	// Bookings
	// --------------------------------------------------------------------------------

	var query = {
		limit: $bookingFilter.options.limit,
		offset: $bookingFilter.options.limit * ($scope.current - 1),
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


	// --------------------------------------------------------------------------------
	// User filter
	// --------------------------------------------------------------------------------

	if($stateParams.user) $scope.filteredUser = $store.get('users', $stateParams.user)
	$scope.userFilter = value => !$stateParams.user || value.user && value.user.id == $scope.filteredUser.id
	

	// --------------------------------------------------------------------------------
	// Group filter
	// --------------------------------------------------------------------------------

	if($stateParams.group) $scope.filteredGroup = $store.get('groups', {code: $stateParams.group})
	$scope.groupFilter = value => !$stateParams.group || value.user.group && value.user.group.id == $scope.filteredGroup.id
	$scope.group = id => _.find($store.groups, {id: id})


})