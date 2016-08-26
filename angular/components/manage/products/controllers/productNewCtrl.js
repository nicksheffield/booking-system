angular.module('app.controllers')

.controller('productNewCtrl', function($scope, $stateParams, $store, $location, $flash, Product) {
	$store.loadProductTypes()
	$scope.types = $store.product_types
	
	$scope.type_id = $flash.use('product_type')

	$scope.save = function() {
		var p = new Product()

		p.name = $scope.name
		// p.image = $scope.image
		p.product_type_id = $scope.type_id

		p.$save().then(function(res) {
			$store.loadProducts()

			$location.path('/manage/product')
		})
	}
})