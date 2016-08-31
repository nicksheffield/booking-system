angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $flash) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.preNewUser = function() {
		$flash.set('class', $scope.group.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.group.$delete().then(function() {
				$store.invalidate('groups')

				$location.path('/manage/class')
			})
		}
	}
})