angular.module('app.controllers')

.controller('productTypeNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Product_Type) {
	$scope.save = function() {
		var pt = new Product_Type();

		pt.code = $scope.code
		pt.name = $scope.name

		pt.$save().then(function(res) {
			$invalidate.add('product_types')

			$location.path('/manage/product-type')
		})
	}
})