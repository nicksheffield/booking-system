angular.module('app.controllers')

.controller('homeCtrl', function($scope, $store, $load, $prepare, $stateParams, $timeout, Booking) {
	window.$scope = $scope

	$scope.user = $store.user
	$scope.bookings = []
	$scope.loading = true

	$scope.bookings = Booking.query({user_id: $store.user.id})

	$scope.bookings.$promise
		.then($prepare.bookings)
		.then(res => $scope.loading = false)

	// --------------------------------------------------------------------------------
	// Dates
	// --------------------------------------------------------------------------------

	$scope.timediff = function(date, unit) {
		return moment().startOf('day').diff(moment(date).startOf('day'), unit) * -1
	}

	$scope.diff = function(date) {
		return $scope.timediff(date, 'days')
	}

	$scope.days = function(num) {
		return num == 1 ? 'day' : 'days'
	}

})