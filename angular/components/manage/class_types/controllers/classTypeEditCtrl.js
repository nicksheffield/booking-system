angular.module('app.controllers')

.controller('classTypeEditCtrl', function($scope, $stateParams, $store, $location, Group_Type) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, (t) => t.id == $stateParams.id)
	})
	
	$scope.save = function() {
		Group_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.invalidate('group_types')
			
			$location.path('/manage/class_type/' + $scope.type.id)
		})
	}
})