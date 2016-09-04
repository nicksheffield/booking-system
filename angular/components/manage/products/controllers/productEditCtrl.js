angular.module('app.controllers')

.controller('productEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product) {
	$scope.product = $store.get('products', $stateParams.id)
	
	$scope.types = $store.product_types
	$scope.selected = {
		type: $store.get('product_types', $scope.product.type.id)
	}
	
	$scope.save = function() {
		$scope.product.type_id = $scope.selected.type.id
		
		Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
			$invalidate.add(['products', 'product_types', 'units'])
			
			$location.path('/manage/product/' + $scope.product.id)
		})
	}
})