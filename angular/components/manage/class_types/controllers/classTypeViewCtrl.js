angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.type.$delete().then(function() {
			$store.loadGroupTypes()
			$location.path('/manage/class_types')
		})
	}
})