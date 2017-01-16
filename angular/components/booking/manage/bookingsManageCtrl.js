angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare) {
	window.scope = $scope

	// --------------------------------------------------------------------------------
	// Filter
	// --------------------------------------------------------------------------------

	$scope.filterOpen = localStorage.filterOpen == "true" ? true : false
	
	var filterDefaults = {
		beforeDate: '',
		afterDate: '',
		showClosed: true,
		perPage: 10
	}

	try {
		$scope.filterOptions = JSON.parse(localStorage.filterOptions)
	} catch(e) {
		$scope.filterOptions = _.clone(filterDefaults)
	}

	if($stateParams.before)  $scope.filterOptions.before     = $stateParams.before
	if($stateParams.after)   $scope.filterOptions.after      = $stateParams.after
	if($stateParams.perpage) $scope.filterOptions.perPage    = parseInt($stateParams.perpage)
	if($stateParams.closed)  $scope.filterOptions.showClosed = $stateParams.closed

	$scope.$watch('filterOptions', function() {
		localStorage.filterOptions = JSON.stringify($scope.filterOptions)
	}, true)

	$scope.toggleFilter = function() {
		$scope.filterOpen = !$scope.filterOpen
		localStorage.filterOpen = $scope.filterOpen
	}
	
	$scope.clearFilter = function() {
		$scope.filterOptions = _.clone(filterDefaults)
	}

	$scope.applyFilter = function() {
		var params = {}

		if($scope.filterOptions.before) params.before = $scope.filterOptions.before
		if($scope.filterOptions.after) params.after = $scope.filterOptions.after
		if($scope.filterOptions.perpage) params.perpage = $scope.filterOptions.perpage

		console.log($scope.filterOptions)

		// $location.path()
		console.log('/bookings?' + jQuery.param(params))
	}


	// --------------------------------------------------------------------------------
	// Pagination
	// --------------------------------------------------------------------------------

	$scope.current = parseInt($stateParams.page) || 1
	$scope.perPage = parseInt($stateParams.perpage) || 10
	$scope.total = 0

	$http.get('/api/booking/count', {params: {user_id: 1}}).then(response => $scope.total = response.data.total)


	// --------------------------------------------------------------------------------
	// Bookings
	// --------------------------------------------------------------------------------

	var query = {
		limit: $scope.perPage,
		offset: $scope.perPage * ($scope.current - 1),
		with: 'products'
	}

	if($stateParams.before) query.limit = $stateParams.before
	if($stateParams.after) query.limit = $stateParams.after

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