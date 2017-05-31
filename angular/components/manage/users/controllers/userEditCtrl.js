angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $state, $store, $location, $invalidate, User) {
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy'
	}
	
	$scope.openDob = function() {
		$scope.openDobDate = $scope.openDobDate ? false : true
	}

	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]

	if($state.current.data.edit_profile) {
		$scope.user = $store.user
		$scope.profileMode = true
	} else {
		$scope.user = _.clone($store.get('users', $stateParams.id))
		$scope.you = $store.user
	}
	
	if($scope.user.admin == 1 && $scope.user.group && !$scope.user.group._isTutor($store.user.id)) {
		$location.path('/manage/user')
	}
	
	$scope.groups = $store.groups
	
	if($store.user.admin === 1) {
		$scope.groups = $store.user.tutors_groups
	}
	
	$scope.selected = {
		group: $scope.user.group ? $store.get('groups', $scope.user.group.id) : {},
		role: _.find($scope.roles, (r) => r.level == $scope.user.admin)
	}
	
	$scope.save = function() {
		if($scope.password == $scope.confirm_password) {
			$scope.user.password = $scope.password
		} else {
			alert('Passwords do not match')
			return
		}

		$scope.user.group_id = $scope.selected.group.id
		$scope.user.admin = $scope.selected.role.level
		
		User.update({id: $scope.user.id}, $scope.user).$promise.then(function(res) {
			if($store.user.admin) {
				$invalidate.add(['users', 'groups'])
			} else {
				$invalidate.add(['groups'])
			}
			
			$location.path('/manage/user/' + $scope.user.id)
		}, function(res) {
			$scope.error = res.data.error
		})
	}
	
})