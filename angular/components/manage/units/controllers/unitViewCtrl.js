angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $invalidate, $location) {
	$scope.unit = $store.get('units', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.unit.$delete().then(function() {
				$invalidate.add(['units', 'products'])
				
				$location.path('/manage/unit')
			})
		}
	}
})