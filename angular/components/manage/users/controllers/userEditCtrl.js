angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $state, $store, $location, $invalidate, User) {
	
	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]

	if($state.current.data.edit_profile) {
		$scope.user = $store.user
		$scope.profileMode = true
	} else {
		$scope.user = $store.get('users', $stateParams.id)
	}
	
	$scope.groups = $store.groups
	$scope.selected = {
		group: $scope.user.group ? $store.get('groups', $scope.user.group.id) : {},
		role: _.find($scope.roles, (r) => r.level == $scope.user.admin)
	}
	
	$scope.save = function() {
		$scope.user.group_id = $scope.selected.group.id
		$scope.user.admin = $scope.selected.role.level
		
		User.update({id: $scope.user.id}, $scope.user).$promise.then(function() {
			$invalidate.add(['users', 'groups'])
			
			$location.path('/manage/user')
		})
	}
	
})