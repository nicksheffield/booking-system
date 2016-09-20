angular.module('app.controllers')

.controller('returnCtrl', function($scope, $stateParams, $store, $location, $http) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)

	console.log($scope.booking)

	$scope.unit = function(id) {
		return $store.get('units', id)
	}

	$scope.close = function() {
		console.log('closed', $scope.booking)
	}
	
})