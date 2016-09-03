angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$scope.unit = $store.get('units', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.unit.$delete().then(function() {
				$store.invalidate(['units', 'products'])
				
				$location.path('/manage/unit')
			})
		}
	}
})