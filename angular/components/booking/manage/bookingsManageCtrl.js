angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare, $bookingFilter, $window, $queryString) {
	window.scope = $scope

	$scope.users = $store.users
	$scope.groups = $store.groups
	$scope.bookings = []

	function loadBookings(page) {
		var bookings = $load.bookings(100, page)

		bookings.$promise.then(function(res) {
			_.forEach(res, (a) => $scope.bookings.push(a))
			console.log('loaded', $scope.bookings.length)

			if(res.length == 100) {
				loadBookings(page + 1)
			} else {
				simplifyBookings()
			}
		})
	}

	loadBookings(1)

	function simplifyBookings() {
		console.log('simplified')
		$store.bookings = $scope.bookings

		$scope.bookings = []

		_.forEach($store.bookings, function(booking) {
			$scope.bookings.push({
				id: booking.id,
				user: {
					name: booking.user.name,
					group: {
						code: booking.user.group ? booking.user.group.code : '',
					}
				},
				closed_at: booking.closed_at,
				_status: booking._status,
				_overdue: booking._overdue,
				_priority: booking._priority
			})
		})
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

})