angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, $prepare, Group, User, sweetAlert) {
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
		$scope.group.active = false

		Group.update({id: $scope.group.id}, $scope.group).$promise
			.then($prepare.group)
			.then(function(res) {
				$invalidate.add('users', 'groups', 'group_types')
				console.log(res)
			})
	}
})