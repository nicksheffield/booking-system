angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $state, $store, $location, $flash) {
	$store.loadGroupTypes()
	
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.preNewClass = function() {
		$flash.set('class_type', $scope.type.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$store.loadGroupTypes()
				$location.path('/manage/class_type')
			})
		}
	}
})