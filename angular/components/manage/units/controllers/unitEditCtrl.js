angular.module('app.controllers')

.controller('unitEditCtrl', function($scope, $stateParams, $store, $location, Unit) {
	$store.loadProducts()
	$scope.products = $store.products
	
	$store.units.$promise.then(function() {
		$scope.unit = _.find($store.units, function(unit) {
			return unit.id == $stateParams.id
		})
	})
	
	$scope.save = function() {
		Unit.update({id: $scope.unit.id}, $scope.unit).$promise.then(function(res) {
			$store.loadUnits()
			$location.path('/view_unit/' + $scope.unit.id)
		})
	}
})