angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, $q, Group, User, sweetAlert) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.group.$delete().then(function() {
				$invalidate.add('groups')

				$location.path('/manage/class')
			})
		})
	}

	$scope.retire = function() {
		sweetAlert.swal({
			text: 'This will set this class as inactive, as well as all students in this class',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			var promises = []
			$scope.loading = true

			$scope.group.active = false
			var groupPromise = Group.update({id: $scope.group.id}, $scope.group).$promise

			$scope.group.users.forEach(u => {
				u.active = false
				var userPromise = User.update({id: u.id}, u).$promise

				promises.push(userPromise)
			})

			promises.push(groupPromise)
			
			$q.all(promises)
				.then(function(res) {
					$invalidate.add('users', 'groups', 'group_types')
					$location.path('/manage/class')
				})
		})
		
	}

	$scope.reactivate = function() {
		sweetAlert.swal({
			text: 'This will set this class as active, as well as all students in this class',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			var promises = []
			$scope.loading = true

			$scope.group.active = true
			var groupPromise = Group.update({id: $scope.group.id}, $scope.group).$promise

			$scope.group.users.forEach(u => {
				u.active = true
				var userPromise = User.update({id: u.id}, u).$promise
				
				promises.push(userPromise)
			})

			promises.push(groupPromise)
			
			$q.all(promises)
				.then(function(res) {
					$invalidate.add('users', 'groups', 'group_types')
					$location.path('/manage/class')
				})
		})
		
	}
})