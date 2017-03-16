angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare, $window, $queryString) {
	window.$scope = $scope

	$scope.users = $store.users
	$scope.groups = $store.groups
	$scope.bookings = []
	$store.bookings = []

	function loadBookings(page) {
		var bookings = $load.bookings(100, page)

		bookings.$promise.then(function(res) {
			_.forEach(res, (a) => $scope.bookings.push(a))

			if(res.length == 100) {
				loadBookings(page + 1)
			} else {
				simplifyBookings()
			}
		})
	}

	loadBookings(1)

	function simplifyBookings() {
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
				created_at: booking.created_at,
				_status: booking._status,
				_overdue: booking._overdue,
				_priority: booking._priority
			})
		})

		$scope.advFilter.apply()
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

	// --------------------------------------------------------------------------------
	// Filter
	// --------------------------------------------------------------------------------

	$scope.advFilter = {
		open: false,
		props: {},
		defaults: {
			after: null,
			before: null,
			user: null,
			overdue: true,
			closed: false,
			issued: true,
			booked: true,
			limit: 10
		},

		toggleOpen: function() {
			$scope.advFilter.open = !$scope.advFilter.open
		},
		clear: function() {
			$scope.advFilter.props = _.clone($scope.advFilter.defaults)
			$scope.advFilter.apply()
		},
		clearUser: function() {
			$scope.advFilter.props.user = null
		},
		apply: function() {
			if($scope.advFilter.props.limit === 0) return

			var temp = [], temp2 = []
			
			_.forEach($store.bookings, function(booking) {
				var keep = true

				if($scope.advFilter.props.after) {
					if(booking.created_at.valueOf() < $scope.advFilter.props.after.valueOf()) {
						keep = false
					}
				}
			
				if($scope.advFilter.props.before) {
					if(booking.created_at.valueOf() > $scope.advFilter.props.before.valueOf()) {
						keep = false
					}
				}

				if($scope.advFilter.props.user) {
					if(booking.user.id !== $scope.advFilter.props.user.id) {
						keep = false
					}
				}

				if(keep) temp.push(booking)
			})

			_.forEach(temp, function(booking) {
				var keep = false

				if($scope.advFilter.props.closed) {
					if(booking.closed_at) {
						keep = true
					}
				}

				if($scope.advFilter.props.issued) {
					if(booking.taken_at && !booking.closed_at && !booking._overdue) {
						keep = true
					}
				}

				if($scope.advFilter.props.overdue) {
					if(booking.taken_at && booking._overdue && !booking.closed_at) {
						keep = true
					}
				}

				if($scope.advFilter.props.booked) {
					if(!booking.taken_at) {
						keep = true
					}
				}

				if(keep) temp2.push(booking)
			})

			$scope.bookings = temp2
			$scope.advFilter.open = false
		}
	}

	$scope.advFilter.clear()

})