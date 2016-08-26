angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $state, $store, $location, $flash) {
	$store.loadGroups()

	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, function(group) {
			return group.id == $stateParams.id
		})
	})
	
	$scope.preNewUser = function() {
		$flash.set('class', $scope.group.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.group.$delete().then(function() {
				$store.loadGroups()
				$location.path('/manage/class')
			})
		}
	}
})