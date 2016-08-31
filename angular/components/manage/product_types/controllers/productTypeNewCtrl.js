angular.module('app.controllers')

.controller('productTypeNewCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, (t) => t.id == $stateParams.id)
	})

	$scope.save = function() {
		var pt = new Product_Type();

		pt.code = $scope.code
		pt.name = $scope.name

		pt.$save().then(function(res) {
			$store.invalidate('product_types')

			$location.path('/manage/product_type')
		})
	}
})