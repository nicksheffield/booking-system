angular.module('app.controllers')

.controller('viewBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.user = $store.user

	$scope.unit = function(id) {
		return $store.get('units', id)
	}
	
	$scope.return_difference = moment().diff(new Date($scope.booking.closed_at), 'hours')
	
})