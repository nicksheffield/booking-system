angular.module('app.controllers')

.controller('viewBookingsCtrl', function($scope, $store) {
	$scope.bookings = $store.bookings
	$scope.units = $store.units

	$scope.group = function(id) {
		return _.find($store.groups, (g) => g.id == id)
	}
})