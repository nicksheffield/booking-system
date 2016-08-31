angular.module('app.controllers')

.controller('productNewCtrl', function($scope, $stateParams, $store, $location, $flash, Product) {
	$scope.types = $store.product_types
	
	$scope.type_id = $flash.use('product_type')

	$scope.save = function() {
		var p = new Product()

		p.name = $scope.name
		// p.image = $scope.image
		p.product_type_id = $scope.type_id

		p.$save().then(function(res) {
			$store.invalidate('products', 'product_types', 'units')

			$location.path('/manage/product')
		})
	}
})