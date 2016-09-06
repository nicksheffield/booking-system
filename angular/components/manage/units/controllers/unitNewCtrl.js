angular.module('app.controllers')

.controller('unitNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Unit) {
	$scope.products = $store.products
	var product_id = $stateParams.product
	
	$scope.selected = { product: {} }
	
	if(product_id) {
		$scope.selected.product = $store.get('products', product_id)
	}

	$scope.save = function() {
		var u = new Unit()

		u.serial_number = $scope.serial_number
		u.asset_number = $scope.asset_number
		u.unit_number = $scope.unit_number
		u.product_id = $scope.selected.product.id
		u.notes = $scope.notes

		u.$save().then(function(res) {
			$invalidate.add('units')

			$location.path('/manage/unit')
		})
	}
})