angular.module('app.controllers')

.controller('homeCtrl', function($scope, $store, $load, $prepare, $stateParams, $timeout, Booking) {
	$scope.user = $store.user
	$scope.bookings = []
	$scope.loading = true

	$scope.bookings = Booking.query({user_id: $store.user.id})

	$scope.bookings.$promise
		.then($prepare.bookings)
		.then(res => $scope.loading = false)

	$scope.statuses = [
		{ text: 'Closed' },
		{ text: 'Overdue' },
		{ text: 'Issued' },
		{ text: 'Booked' },
	]

	$scope.dayFilters = [
		{ text: 'Tomorrow' },
		{ text: 'Today' },
		{ text: 'Yesterday' },
	]

	$scope.dayFormatter = date => {
		if(!date) return ''
		
		let suffix = ''
		let target = moment(date)
		let today = moment()
		let tomorrow = moment().add(1, 'd')
		let yesterday = moment().subtract(1, 'd')

		if(target.isSame(tomorrow, 'day')) {
			suffix = 'Tomorrow'
		} else if(target.isSame(today, 'day')) {
			suffix = 'Today'
		} else if(target.isSame(yesterday, 'day')) {
			suffix = 'Yesterday'
		}

		if(suffix) suffix = ` (${suffix})`

		return target.format('YYYY-MM-DD') + suffix
	}

	$scope.dataTable = {
		items: $scope.bookings,
		buttons: ['view'],
		slug: 'booking',
		orderBys: [],
		cols: [
			{
				name: 'Pickup',
				// prop: x => x.pickup_at ? moment(x.pickup_at).format('MMM Do') : '',
				prop: x => $scope.dayFormatter(x.pickup_at),
				filter: {
					type: 'dropdown2',
					items: $scope.dayFilters,
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						small: true
					}
				}
			},
			{
				name: 'Issued',
				// prop: x => x.taken_at ? moment(x.taken_at).format('MMM Do') : '',
				prop: x => $scope.dayFormatter(x.taken_at),
				filter: {
					type: 'dropdown2',
					items: $scope.dayFilters,
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						small: true
					}
				}
			},
			{
				name: 'Due',
				// prop: x => x.due_at ? moment(x.due_at).format('MMM Do') : '',
				prop: x => $scope.dayFormatter(x.due_at),
				filter: {
					type: 'dropdown2',
					items: $scope.dayFilters,
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						small: true
					}
				}
			},
			{
				name: 'Closed',
				// prop: x => x.closed_at ? moment(x.closed_at).format('MMM Do') : '',
				prop: x => $scope.dayFormatter(x.closed_at),
				filter: {
					type: 'dropdown2',
					items: $scope.dayFilters,
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						small: true
					}
				}
			},
			{
				name: 'Status',
				prop: '_status',
				indicator: x => {
					if(x.Status === 'Booked') return '#2ECC71'
					if(x.Status === 'Issued') return '#F39C12'
					if(x.Status === 'Overdue') return '#E74C3C'
					if(x.Status === 'Closed') return '#7F8C8D'
				},
				filter: {
					type: 'dropdown2',
					items: $scope.statuses,
					value: [$scope.statuses[1], $scope.statuses[2], $scope.statuses[3]],
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						small: true,
					}
				}
			}
		]
	}

})