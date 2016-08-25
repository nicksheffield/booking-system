angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadUnits()

	$store.units.$promise.then(function() {
		$scope.unit = _.find($store.units, function(unit) {
			return unit.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.unit.$delete().then(function() {
			$store.loadUnits()
			$location.path('/manage/units')
		})
	}
})