angular.module('app.controllers')

.controller('viewBookingsCtrl', function($scope, $store) {
	$scope.bookings = $store.bookings
	$scope.units = $store.units
})