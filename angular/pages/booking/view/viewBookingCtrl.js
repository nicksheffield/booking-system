angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, Booking, $prepare, $merge, sweetAlert) {
	$scope.user = $store.user
	$scope.errors = []

	window.$scope = $scope

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	$scope.booking = Booking.get({id: $stateParams.id, with: 'user|products', token: localStorage.satellizer_token})
	
	$scope.booking.$promise
		.then($prepare.booking)
		.then(function(booking) {
			$merge.bookings([booking])
			$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')
			$scope.dataTable = {
				items: $scope.booking.products,
				limit: 25,
				cols: [
					{
						name: 'Name',
						prop: 'name'
					},
					{
						name: 'Unit',
						prop: x => {
							if(x.limitless) return 'N/A'
							
							if(x.pivot) {
								if(x.pivot.unit_id) {
									return $store.get('units', x.pivot.unit_id).unit_number
								}
							}
							return ''
						}
					},
					{
						name: 'Notes',
						prop: x => {
							if(x.pivot) {
								return x.pivot.notes
							}
							return ''
						}
					},
					{
						name: 'Returned',
						prop: x => {
							if(x.pivot) {
								if(x.pivot.returned_at) {
									return moment(x.pivot.returned_at).format('YYYY-MM-DD')
								}
							}
							return ''
						}
					},
				]
			}
		}, function(err) {
			$scope.errors.push({message: err.data.error})
		})


	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$http.delete('/api/booking/' + $scope.booking.id).then(function() {
				$invalidate.add('booking_count')
				$location.path('/bookings')
			})
		})
	}
	
})