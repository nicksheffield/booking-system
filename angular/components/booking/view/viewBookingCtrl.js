angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
})