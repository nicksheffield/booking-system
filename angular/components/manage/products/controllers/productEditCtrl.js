angular.module('app.controllers')

.controller('productEditCtrl', function($scope, $stateParams, $store, $location, Product) {
	$store.products.$promise.then(function() {
		$scope.product = _.find($store.products, (p) => p.id == $stateParams.id)
	})
	
	$scope.types = $store.product_types
	
	$scope.save = function() {
		Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
			$store.invalidate('products')
			$location.path('/manage/product/' + $scope.product.id)
		})
	}
})