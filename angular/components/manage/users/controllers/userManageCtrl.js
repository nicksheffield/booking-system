angular.module('app.controllers')

.controller('userManageCtrl', function($scope, $store, $location) {
	$scope.users = $store.users
	
	$scope.staffFilter = function(value, index, array) {
		if($store.user.admin == 2) {
			return true
		}
		
		return value.group && value.group._isTutor($store.user.id)
	}
})