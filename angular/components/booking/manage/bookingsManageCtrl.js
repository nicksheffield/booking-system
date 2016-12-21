angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare) {
	window.scope = $scope

	// --------------------------------------------------------------------------------
	// Pagination
	// --------------------------------------------------------------------------------

	$scope.current = parseInt($stateParams.page) || 1
	$scope.perPage = 10
	$scope.total = 0

	$http.get('/api/booking/count').then(response => $scope.total = response.data.total)


	// --------------------------------------------------------------------------------
	// Bookings
	// --------------------------------------------------------------------------------

	$scope.bookings = Booking.query({
		limit: $scope.perPage,
		offset: $scope.perPage * ($scope.current - 1),
		with: 'user|products'
	})

	$scope.bookings.$promise
		.then($prepare.bookings)
		.then(bookings => $merge.bookings(bookings))


	// --------------------------------------------------------------------------------
	// Filter
	// --------------------------------------------------------------------------------

	$scope.filterOpen = false

	$scope.toggleFilter = function() {
		$scope.filterOpen = !$scope.filterOpen
	}

	$scope.applyFilter = function() {
		console.log('applied!')
	}


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

	$scope.afterDate = ''
	$scope.beforeDate = ''

	$scope.search = function() {
		$scope.bookings = $store.bookings = $load.bookings({after: $scope.afterDate, before: $scope.beforeDate})
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