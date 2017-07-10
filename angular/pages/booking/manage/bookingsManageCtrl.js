angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $stateParams, $timeout, $prepare, Booking) {

	$scope.users = $store.users
	$scope.groups = $store.groups
	$scope.bookings = []
	$scope.allBookings = []

	function loadBookings(page) {
		$scope.loading = true
		var bookings = $load.bookings(100, page)

		bookings.$promise
			.then(function(res) {
				_.forEach(res, (a) => $scope.bookings.push(a))

				if(res.length == 100) {
					loadBookings(page + 1)
				} else {
					simplifyBookings()
					$scope.loading = false
				}
			})
	}

	loadBookings(1)

	function simplifyBookings() {
		$scope.allBookings = $scope.bookings

		// $scope.allBookings.map($prepare.booking)

		$scope.bookings = []

		_.forEach($scope.allBookings, function(booking) {
			$scope.bookings.push({
				id: booking.id,
				user: booking.user ? {
					name: booking.user.name,
					group: {
						code: booking.user.group ? booking.user.group.code : '',
					}
				} : { name: 'N/A' },
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

	$scope.timediff = function(date, unit) {
		return moment().startOf('day').diff(moment(date).startOf('day'), unit) * -1
	}

	$scope.diff = function(date) {
		return $scope.timediff(date, 'days')
	}

	$scope.days = function(num) {
		return num == 1 ? 'day' : 'days'
	}


	$scope.sortables = [
		{ text: 'Name' },
		{ text: 'Class' },
		{ text: 'Date' }
	]

	$scope.sortable = $scope.sortables[0]

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
		importFromQueryString: function(obj) {
			if(obj.user) $scope.advFilter.props.user = $store.get('users', parseInt(obj.user))
			$scope.advFilter.apply()
		},
		importFromLocalStorage: function() {
			if(localStorage.advFilter) {
				$scope.advFilter.props = _.merge(
					$scope.advFilter.props,
					JSON.parse(localStorage.advFilter)
				)
			}

			$scope.advFilter.apply()
		},
		apply: function() {
			if($scope.advFilter.props.limit === 0) return

			var temp = [], temp2 = []
			
			_.forEach($scope.allBookings, function(booking) {
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

			localStorage.setItem('advFilter', JSON.stringify($scope.advFilter.props))
		}
	}

	// $scope.advFilter.clear()

	if(typeof $scope.advFilter.props.limit == 'undefined') {
		$scope.advFilter.clear()
	}

	$scope.advFilter.importFromLocalStorage()

	$scope.advFilter.importFromQueryString($stateParams)

	$scope.group_code = (user) => user.group ? user.group.code : ''

	// $scope.$watch('advFilter.props', function(newVal, oldVal) {
	// 	localStorage.setItem('advFilter', JSON.stringify($scope.advFilter.props))
	// }, true)

})