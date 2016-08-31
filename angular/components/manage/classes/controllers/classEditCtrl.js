angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, Group) {
	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, (g) => g.id == $stateParams.id)
	})
	
	$scope.types = $store.group_types
	
	$scope.save = function() {
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$store.invalidate('groups')
			
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})