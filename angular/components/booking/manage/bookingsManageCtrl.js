angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store) {
	$scope.bookings = $store.bookings
	$scope.units = $store.units

	$scope.group = function(id) {
		return _.find($store.groups, (g) => g.id == id)
	}
	
	$scope.inClass = function(value, index, array) {
		if($store.user.admin == 2) {
			return true
		}
		
		if(value.user.group && value.user.group._isTutor($store.user.id)) {
			return true
		}
	}
})