angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadProducts()

	$store.products.$promise.then(function() {
		$scope.product = _.find($store.products, function(product) {
			return product.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.product.$delete().then(function() {
			$store.loadProducts()
			$location.path('/manage/products')
		})
	}
})