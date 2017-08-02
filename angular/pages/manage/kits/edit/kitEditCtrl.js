angular.module('app.controllers')

.controller('kitEditCtrl', function($scope, $store, $stateParams, $location, $load, $invalidate, Kit) {

	$scope.selectedProducts = [{ quantity: 1 }]
	$scope.products = $store.products
	$scope.kit = $load.kit($stateParams.id)

	$scope.kit.$promise.then(k => {
		$scope.selectedProducts = k.products.map(p => {
			let o = {quantity: p.pivot.quantity}

			o.product = $store.get('products', p.id)
			
			return o
		})
	})

	

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
		
		$scope.kit.$update(function(res) {
			$invalidate.add('kits')
			$location.path('/kit')
		})
	}
})