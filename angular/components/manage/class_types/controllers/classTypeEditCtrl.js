angular.module('app.controllers')

.controller('classTypeEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Group_Type) {
	$scope.type = _.clone($store.get('group_types', $stateParams.id))
	
	$scope.save = function() {
		Group_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$invalidate.add('group_types')
			
			$location.path('/manage/class-type/' + $scope.type.id)
		})
	}
})