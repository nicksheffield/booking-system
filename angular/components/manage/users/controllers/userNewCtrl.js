angular.module('app.controllers')

.controller('userNewCtrl', function($scope, $stateParams, $store, $location, $auth, $invalidate, User) {
	var group = $stateParams['class']
	
	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]
	
	$scope.groups = $store.groups
	$scope.user = $store.user
	$scope.errors = []
	
	if($store.user.admin === 1) {
		$scope.groups = $store.user.tutors_groups
	}
	
	$scope.selected = {
		group: $scope.groups,
		role: $scope.roles[0],
	}
	
	if(group) {
		$scope.selected.group = $store.get('groups', {code: group})
	}
	

	$scope.save = function() {
		if($scope.password !== $scope.confirm_password) {
			$scope.errors.push({
				message: 'The passwords do not match'
			})
			return
		}

		if(!$scope.password) {
			$scope.errors.push({
				message: 'You need to set a password'
			})
			return
		}

		var u = new User()
		
		u.dob        = $scope.dob
		u.name       = $scope.name
		u.email      = $scope.email
		u.phone      = $scope.phone
		u.group_id   = $scope.selected.group.id
		u.password   = $scope.password
		u.id_number  = $scope.id_number
		u.admin      = $scope.selected.role.level
		
		u.$save().then(function(res) {
			$invalidate.add('groups')
			
			$location.path('/manage/user')
		}).catch(function(res) {
			console.log('save err', res)
		})
	}
})