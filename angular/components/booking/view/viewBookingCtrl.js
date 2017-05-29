angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, Booking, $prepare, $merge) {
	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.user = $store.user
	$scope.errors = []

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	if($scope.booking) {
		$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')
	} else {
		$scope.booking = Booking.get({id: $stateParams.id, with: 'user|products', token: localStorage.satellizer_token})
		
		$scope.booking.$promise
			.then($prepare.booking)
			.then(function(booking) {
				$merge.bookings([booking])
				$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')
				console.log('loaded', booking.products)
			}, function(err) {
				$scope.errors.push({message: err.data.error})
			})
	}

	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$http.delete('/api/booking/' + $scope.booking.id).then(function() {
				$invalidate.add('booking_count')
				$location.path('/bookings')
			})
		}
	}
	
})