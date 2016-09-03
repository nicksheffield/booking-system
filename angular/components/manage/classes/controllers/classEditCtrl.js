angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, Group) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.types = $store.group_types
	
	$scope.save = function() {
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$store.invalidate(['groups', 'group_types', 'users'])
			
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})