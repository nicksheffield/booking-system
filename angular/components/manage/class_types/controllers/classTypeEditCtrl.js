angular.module('app.controllers')

.controller('classTypeEditCtrl', function($scope, $stateParams, $store, $location, Group_Type) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	$scope.save = function() {
		Group_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.invalidate(['group_types', 'groups'])
			
			$location.path('/manage/class_type/' + $scope.type.id)
		})
	}
})