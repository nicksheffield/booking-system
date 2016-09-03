angular.module('app.controllers')

.controller('productEditCtrl', function($scope, $stateParams, $store, $location, Product) {
	$scope.product = $store.get('products', $stateParams.id)
	
	$scope.types = $store.product_types
	
	$scope.save = function() {
		Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
			$store.invalidate(['products', 'product_types', 'units'])
			
			$location.path('/manage/product/' + $scope.product.id)
		})
	}
})