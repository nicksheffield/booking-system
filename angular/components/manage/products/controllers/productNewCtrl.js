angular.module('app.controllers')

.controller('productNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product) {
	var type = $stateParams.type
	
	$scope.types = $store.product_types
	$scope.type = type ? $store.get('product_types', {name: type}) : null
	$scope.name = $stateParams.name || ''

	$scope.save = function() {
		var p = new Product()

		p.name = $scope.name
		p.product_type_id = $scope.type.id

		p.$save().then(function(res) {
			$invalidate.add('products')

			$location.path('/manage/product')
		})
	}
})