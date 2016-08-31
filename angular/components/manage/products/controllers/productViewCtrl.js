angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location, $flash) {
	$scope.product = $store.get('products', $stateParams.id)
	
	$scope.preNewUnit = function() {
		$flash.set('product', $scope.product.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.product.$delete().then(function() {
				$store.loadProducts()
				$location.path('/manage/product')
			})
		}
	}
})