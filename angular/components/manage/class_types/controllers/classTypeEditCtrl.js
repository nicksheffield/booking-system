angular.module('app.controllers')

.controller('classTypeEditCtrl', function($scope, $stateParams, $store, $location, Group_Type) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.save = function() {
		Group_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.loadGroupTypes()
			$location.path('/manage/class_type/' + $scope.type.id)
		})
	}
})