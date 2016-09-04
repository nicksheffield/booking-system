angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $invalidate) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.group.$delete().then(function() {
				$invalidate.add('groups')

				$location.path('/manage/class')
			})
		}
	}
})