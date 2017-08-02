angular.module('app.controllers')

.controller('kitNewCtrl', function($scope, $store, $location, $invalidate, Kit) {

	$scope.selectedProducts = [{ quantity: 1 }]
	$scope.products = $store.products
	$scope.kit = new Kit()

	

	$scope.product_type = (product) => product.type ? product.type.name : ''

	$scope.addProduct = function() {
		$scope.selectedProducts.push({ quantity: 1 })
	}
	
	$scope.removeProduct = function(product, index) {
		$scope.selectedProducts.splice(index, 1)
		
		if(!$scope.selectedProducts.length) {
			$scope.addProduct()
		}
	}
	
	$scope.save = function() {

		$scope.kit.items = $scope.selectedProducts
		
		$scope.kit.$save(function(res) {
			$invalidate.add('kits')
			$location.path('/kit')
		})
	}
})