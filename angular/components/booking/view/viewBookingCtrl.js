angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.user = $store.user

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	// $scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')

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