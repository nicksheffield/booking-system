angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $store, $location, $invalidate) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$invalidate.add(['group_types', 'groups'])
				
				$location.path('/manage/class_type')
			})
		}
	}
})