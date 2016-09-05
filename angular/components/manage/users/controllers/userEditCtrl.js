angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $state, $store) {
	
	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]
	window.scope = $scope

	if($state.current.data.edit_profile) {
		$scope.user = $store.user
	} else {
		$scope.user = $store.get('users', $stateParams.id)
	}
	
	$scope.groups = $store.groups
	$scope.selected = {
		group: $scope.user.group ? $store.get('groups', $scope.user.group.id) : {},
		role: _.find($scope.roles, (r) => r.level == $scope.user.admin)
	}
	
})