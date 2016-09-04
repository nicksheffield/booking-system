angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $state, $store) {

	if($state.current.data.edit_profile) {
		$scope.user = $store.user
	} else {
		$scope.user = $store.get('users', $stateParams.id)
	}
	
	$scope.groups = $store.groups
	$scope.selected = {
		group: $scope.user.group ? $store.get('groups', $scope.user.group.id) : {}
	}
})