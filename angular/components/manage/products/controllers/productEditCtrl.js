angular.module('app.controllers')

.controller('productEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product) {
	$scope.product = $store.get('products', $stateParams.id)
	window.$scope = $scope
	
	$scope.types = $store.product_types
	$scope.type = $scope.product.type ? $store.get('product_types', $scope.product.type.id) : null
	
	$scope.save = function() {
		$scope.product.product_type_id = $scope.type ? $scope.type.id : ''
		console.log('type id', $scope.product.type_id)
		
		Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
			$invalidate.add('products')
			
			$location.path('/manage/product/' + $scope.product.id)
		})
	}
})