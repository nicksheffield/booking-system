angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadProducts()

	$store.products.$promise.then(function() {
		$scope.product = _.find($store.products, function(product) {
			return product.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.product.$delete().then(function() {
				$store.loadProducts()
				$location.path('/manage/products')
			})
		}
	}
})