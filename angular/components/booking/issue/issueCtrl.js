angular.module('app.controllers')

.controller('issueCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
		minDate: new Date(),
	}

	console.log($scope)
	
	$scope.openPickup = function() {
		$scope.openPickupDate = $scope.openPickupDate ? false : true
	}
	
	$scope.openDue = function() {
		$scope.openDueDate = $scope.openDueDate ? false : true
	}

	$scope.issue = function() {
		$scope.booking.taken_at = new Date()

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function(res) {
				$invalidate.add('bookings')
			})
	}
	
})