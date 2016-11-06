angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $store, $location, $invalidate) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	window.scope = $scope
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$invalidate.add('group_types')
				
				$location.path('/manage/class_type')
			})
		}
	}
})