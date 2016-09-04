angular.module('app.controllers')

.controller('unitEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Unit) {
	$scope.products = $store.products
	
	$scope.unit = $store.get('units', $stateParams.id)
	$scope.selected = {
		product: $store.get('products', $scope.unit.product.id)
	}
	
	$scope.save = function() {
		$scope.unit.product_id = $scope.selected.product.id
		
		Unit.update({id: $scope.unit.id}, $scope.unit).$promise.then(function(res) {
			$invalidate.add(['units', 'products'])
			
			$location.path('/manage/unit/' + $scope.unit.id)
		})
	}
})