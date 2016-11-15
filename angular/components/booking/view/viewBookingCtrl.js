angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, Booking, $prepare) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.user = $store.user

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')

	if(!$scope.user.admin) {
		Booking
			.get({id: $stateParams.id, with: 'user|products', token: localStorage.satellizer_token})
			.$promise
			.then($prepare.booking)
			.then(function(booking) {
				$scope.booking = booking
				console.log(booking)
			})
	}

	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.booking.$delete().then(function() {
				$invalidate.add('bookings')
				
				$location.path('/bookings')
			})
		}
	}
	
})