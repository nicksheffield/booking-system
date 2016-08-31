angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadUnits()

	$scope.unit = $store.get('units', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.unit.$delete().then(function() {
				$store.invalidate('units')
				
				$location.path('/manage/unit')
			})
		}
	}
})