angular.module('app.controllers')

.controller('productTypeNewCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$scope.save = function() {
		var pt = new Product_Type();

		pt.code = $scope.code
		pt.name = $scope.name

		pt.$save().then(function(res) {
			$store.invalidate(['product_types', 'products'])

			$location.path('/manage/product_type')
		})
	}
})