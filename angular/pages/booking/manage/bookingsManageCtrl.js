angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $stateParams, $timeout, $prepare, Booking) {

	window.$scope = $scope

	$scope.users = $store.users
	$scope.groups = $store.groups
	$scope.statuses = [
		{ text: 'Closed' },
		{ text: 'Issued' },
		{ text: 'Booked' }	
	]

	$scope.dropdown_test_data = [
		{ text: 'Option A', checked: false },
		{ text: 'Option 2', checked: true },
		{ text: 'Option III', checked: false },
	]

	$scope.dropdown_test_display = { text: 'text' }

	$scope.dropdown_value = null




	$scope.bookings = Booking.query({
		after: moment().subtract(3, 'months').format('YYYY-MM-DD'),
		with: 'user'
	})

	$scope.bookings.$promise
		.then($prepare.bookings)
		.then(bookings => {
			return bookings.map(b => {
				return {
					name: b.name,
					created_at: b.created_at,
					issued_at: b.issued_at,
					due_at: b.due_at,
					closed_at: b.closed_at,
					_status: b._status,
					user: {
						name: b.user.name
					},
				}
			})
		})

	$scope.dataTable = {
		items: $scope.bookings,
		buttons: ['view'],
		slug: 'booking',
		orderBys: [],
		cols: [
			{
				name: 'User',
				prop: 'user.name',
				getter: x => x.user ? x.user.name : '',
				filter: {
					type: 'dropdown2',
					items: $store.users,
					value: $store.get('users', $stateParams.user) || null,
					config: {
						text: 'name',
						id: 'id',
						multiple: false,
						clearable: true,
						placeholder: 'Search...',
						small: true
					}
				}
				// filter: {
				// 	type: 'dropdown',
				// 	items: $store.users,
				// 	display: { text: 'name' },
				// 	value: $store.get('users', $stateParams.user)
				// }
			},
			{
				name: 'Pickup',
				prop: 'pickup_at',
				getter: x => x.pickup_at ? moment(x.pickup_at).format('MMM Do') : '',
				// filter: {
				// 	type: 'date'
				// }
			},
			{
				name: 'Issued',
				prop: 'issued_at',
				getter: x => x.taken_at ? moment(x.taken_at).format('MMM Do') : '',
				// filter: {
				// 	type: 'date'
				// }
			},
			{
				name: 'Due',
				prop: 'due_at',
				getter: x => x.due_at ? moment(x.due_at).format('MMM Do') : '',
				// filter: {
				// 	type: 'date'
				// }
			},
			{
				name: 'Closed',
				prop: 'closed_at',
				getter: x => x.closed_at ? moment(x.closed_at).format('MMM Do') : '',
				// filter: {
				// 	type: 'date'
				// }
			},
			{
				name: 'Status',
				prop: '_status',
				filter: {
					type: 'dropdown2',
					items: $scope.statuses,
					value: [$scope.statuses[1], $scope.statuses[2]],
					config: {
						text: 'text',
						id: 'text',
						multiple: true,
						placeholder: 'Search...',
						small: true
					}
				}
				// filter: {
				// 	type: 'checkbox-dropdown',
				// 	items: [
				// 		{ text: 'Closed', checked: false },
				// 		{ text: 'Issued', checked: true },
				// 		{ text: 'Booked', checked: true },
				// 	],
				// 	display: { text: 'text' }
				// }
			}
		]
	}

})