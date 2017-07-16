angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $state, $store, $location, $invalidate, User) {

	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]

	$scope.errors = []

	if($state.current.data.edit_profile) {
		$scope.user = _.clone($store.user)
		$scope.profileMode = true
	} else {
		$scope.user = _.clone($store.get('users', $stateParams.id))
		$scope.you = $store.user
	}

	$scope.curUser = $store.user

	if($scope.curUser.admin < 2 && $scope.user.admin > 0 && $scope.user.id !== $scope.curUser.id) {
		$location.path('/manage/user')
	}
	
	if($scope.user.admin == 1 && $scope.user.group && !$scope.user.group._isTutor($store.user.id)) {
		$location.path('/manage/user')
	}
	
	$scope.groups = $store.groups.filter(g => g.active)
	
	if($store.user.admin === 1) {
		$scope.groups = $store.user.tutors_groups
	}

	$scope.group = $scope.user.group ? $store.get('groups', $scope.user.group.id) : null

	$scope.role = _.find($scope.roles, (r) => r.level == $scope.user.admin)
	
	$scope.save = function() {
		if($scope.password !== $scope.confirm_password) {
			$scope.errors.push({
				message: 'The passwords do not match'
			})
			return
		} else {
			$scope.user.password = $scope.password
		}

		$scope.user.group_id = $scope.group ? $scope.group.id : ''
		$scope.user.admin = $scope.role.level

		console.log(JSON.stringify($scope.user))

		User.update({id: $scope.user.id}, $scope.user).$promise.then(function(res) {
			if($store.user.admin) {
				$invalidate.add(['users', 'groups'])
			} else {
				$invalidate.add(['groups'])
			}
			
			$location.path('/manage/user/' + $scope.user.id)
		}, function(res) {
			$scope.errors.push({
				message: res.data.error
			})
		})
	}
})