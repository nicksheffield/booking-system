angular.module('app.controllers')

.controller('productNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product) {
	var type = $stateParams.type
	
	$scope.selected = { type: {} }
	$scope.types = $store.product_types
	
	if(type) {
		$scope.selected.type = $store.get('product_types', {name: type})
	}

	$scope.save = function() {
		var p = new Product()

		p.name = $scope.name
		// p.image = $scope.image
		p.product_type_id = $scope.selected.type.id

		p.$save().then(function(res) {
			$invalidate.add('products')

			$location.path('/manage/product')
		})
	}
})