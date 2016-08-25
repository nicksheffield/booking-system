angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadGroups()

	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, function(group) {
			return group.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.group.$delete().then(function() {
			$store.loadGroups()
			$location.path('/manage/classes')
		})
	}
})