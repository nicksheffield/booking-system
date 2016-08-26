angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, Group) {
	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, function(group) {
			return group.id == $stateParams.id
		})
	})
	
	$store.loadGroupTypes()
	$scope.types = $store.group_types
	
	$scope.save = function() {
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$store.loadGroups()
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})