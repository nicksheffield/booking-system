angular.module('app.controllers')

.controller('productEditCtrl', function($scope, $stateParams, $store, $location, Product) {
	$store.products.$promise.then(function() {
		$scope.product = _.find($store.products, function(product) {
			return product.id == $stateParams.id
		})
	})
	
	$store.loadProductTypes()
	$scope.types = $store.product_types
	
	$scope.save = function() {
		Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
			console.log(res)
			$store.loadProducts()
			$location.path('/view_product/' + $scope.product.id)
		})
	}
})