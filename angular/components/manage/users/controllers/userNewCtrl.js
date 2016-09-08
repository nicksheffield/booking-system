angular.module('app.controllers')

.controller('userNewCtrl', function($scope, $stateParams, $store, $location, $auth, $invalidate, User) {
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy'
	}
	
	$scope.openDob = function() {
		$scope.openDobDate = $scope.openDobDate ? false : true
	}

	var group = $stateParams['class']
	
	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]
	
	$scope.groups = $store.groups
	$scope.user = $store.user
	
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