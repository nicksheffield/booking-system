angular.module('app.controllers')

.controller('issueCtrl', function($scope, $stateParams, $store, $location) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	
	console.log($scope)
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
		minDate: new Date(),
	}
	
	$scope.openPickup = function() {
		$scope.openPickupDate = $scope.openPickupDate ? false : true
	}
	
	$scope.openDue = function() {
		$scope.openDueDate = $scope.openDueDate ? false : true
	}
	
})