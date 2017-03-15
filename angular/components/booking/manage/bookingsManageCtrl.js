angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare, $bookingFilter, $window, $queryString) {
	window.scope = $scope

	$scope.users = $store.users
	$scope.groups = $store.groups
	$scope.bookings = []

	function loadBookings(page) {
		var bookings = $load.bookings(100, page)

		bookings.$promise.then(function(res) {
			if(res.length == 100) loadBookings(page + 1)

			_.forEach(res, (a) => $scope.bookings.push(a))
		})
	}

	loadBookings(1)

	$scope.$watch('bookings', function(newVal) {
		console.log('bookings loaded', newVal.length)
	}, true)

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