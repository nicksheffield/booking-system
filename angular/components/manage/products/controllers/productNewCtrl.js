angular.module('app.controllers')

.controller('productNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product) {
	var type = $stateParams.type
	
	$scope.selected = { type: {} }
	$scope.types = $store.product_types
	$scope.name = $stateParams.name || ''
	
	if(type) {
		$scope.selected.type = $store.get('product_types', {name: type})
	}

	$scope.save = function() {
		var p = new Product()

		p.name = $scope.name
		p.product_type_id = $scope.selected.type.id

		p.$save().then(function(res) {
			$invalidate.add('products')

			$location.path('/manage/product')
		})
	}
})