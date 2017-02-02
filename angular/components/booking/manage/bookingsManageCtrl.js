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
		showClosed: false,
		showIssued: true,
		showBooked: true,
		showReturned: true,
		perPage: 10
	}

	try {
		$scope.filterOptions = JSON.parse(localStorage.filterOptions)
	} catch(e) {
		$scope.filterOptions = _.clone(filterDefaults)
	}

	if($stateParams.before)    $scope.filterOptions.before       = $stateParams.before
	if($stateParams.after)     $scope.filterOptions.after        = $stateParams.after
	if($stateParams.perpage)   $scope.filterOptions.perPage      = parseInt($stateParams.perpage)
	if($stateParams.closed)    $scope.filterOptions.showClosed   = $stateParams.closed
	if($stateParams.returned)  $scope.filterOptions.showReturned = $stateParams.returned
	if($stateParams.issued)    $scope.filterOptions.showIssued   = $stateParams.issued
	if($stateParams.booked)    $scope.filterOptions.showBooked   = $stateParams.booked

	$scope.toggleFilter = function() {
		$scope.filterOpen = !$scope.filterOpen
		localStorage.filterOpen = $scope.filterOpen
	}

	$scope.syncFilter = function() {
		localStorage.filterOptions = JSON.stringify($scope.filterOptions)
	}
	
	$scope.clearFilter = function() {
		$scope.filterOptions = _.clone(filterDefaults)
		$scope.syncFilter()
	}

	$scope.applyFilter = function() {
		$scope.syncFilter()

		var params = {}

		if($scope.filterOptions.before)       params.before   = $scope.filterOptions.before
		if($scope.filterOptions.after)        params.after    = $scope.filterOptions.after
		if($scope.filterOptions.perpage)      params.perpage  = $scope.filterOptions.perpage
		if($scope.filterOptions.showClosed)   params.closed   = $scope.filterOptions.showClosed
		if($scope.filterOptions.showIssued)   params.issued   = $scope.filterOptions.showIssued
		if($scope.filterOptions.showBooked)   params.booked   = $scope.filterOptions.showBooked
		if($scope.filterOptions.showReturned) params.returned = $scope.filterOptions.showReturned

		$location.path('/bookings').search(params)
		// console.log('/bookings?' + jQuery.param(params))
	}


	// --------------------------------------------------------------------------------
	// Pagination
	// --------------------------------------------------------------------------------

	$scope.current = parseInt($stateParams.page) || 1
	$scope.perPage = parseInt($stateParams.perpage) || 10
	$scope.total = 0

	var options = {}

	if(!$store.user.admin) {
		options.params = {user_id: $store.user.id}
	}

	function getCount(options) {
		$http.get('/api/booking/count', options).then(response => $scope.total = response.data.total)
	}

	getCount(options)
	


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