angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $store, $location, $flash) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	$scope.preNewClass = function() {
		$flash.set('class_type', $scope.type.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$store.invalidate(['group_types', 'groups'])
				
				$location.path('/manage/class_type')
			})
		}
	}
})