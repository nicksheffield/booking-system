angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, Group) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.types = $store.group_types
	$scope.selected = {
		type: $store.get('group_types', $scope.group.type.id)
	}
	
	$scope.save = function() {
		$scope.group.type_id = $scope.selected.type.id
		
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$store.invalidate(['groups', 'group_types', 'users'])
			
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})