angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store) {
	$scope.bookings = $store.bookings
	$scope.units = $store.units

	$scope.showClosed = false

	$scope.toggleClosed = function() {
		$scope.showClosed = !$scope.showClosed
	}

	$scope.group = function(id) {
		return _.find($store.groups, {id: id})
	}

	$scope.showClosedFilter = function(value, index, array) {
		if(!$scope.showClosed && value.closed_at) {
			return false
		} else {
			return true
		}
	}
})