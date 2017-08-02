angular.module('app.controllers')

.controller('unitEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Unit) {
	$scope.products = $store.products
	
	$scope.unit = _.clone($store.get('units', $stateParams.id))
	$scope.product = $scope.unit.product ? $store.get('products', $scope.unit.product.id) : null

	$scope.product_type = (product) => product.type ? product.type.name : ''
	
	$scope.save = function() {
		$scope.unit.product_id = $scope.product ? $scope.product.id : ''
		
		Unit.update({id: $scope.unit.id}, $scope.unit).$promise.then(function(res) {
			$invalidate.add('units')
			
			$location.path('/unit/' + $scope.unit.id)
		})
	}
})