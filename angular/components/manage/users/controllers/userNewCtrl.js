angular.module('app.controllers')

.controller('userNewCtrl', function($scope, $stateParams, $store, $location, $auth, $invalidate, User) {
	
	var group = $stateParams['class']
	window.scope = $scope
	
	$scope.roles = [
		{ level: 0, text: 'Student'},
		{ level: 1, text: 'Staff'},
		{ level: 2, text: 'Manager'},
	]
	
	$scope.groups = $store.groups
	$scope.selected = {
		group: {},
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
			$invalidate.add(['users', 'groups', 'bookings'])
			
			$location.path('/manage/user')
		}).catch(function(res) {
			console.log('save err', res)
		})
	}
})