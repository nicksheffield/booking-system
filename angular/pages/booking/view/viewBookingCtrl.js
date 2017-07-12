angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, Booking, $prepare, $merge) {
	$scope.user = $store.user
	$scope.errors = []

	

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	$scope.booking = Booking.get({id: $stateParams.id, with: 'user|products', token: localStorage.satellizer_token})
	
	$scope.booking.$promise
		.then($prepare.booking)
		.then(function(booking) {
			$merge.bookings([booking])
			$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')
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