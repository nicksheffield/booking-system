angular.module('app.controllers')

.controller('productTypeNewCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, function(type) {
			return type.id == $stateParams.id
		})
	})

	$scope.save = function() {
		var pt = new Product_Type();

		pt.code = $scope.code
		pt.name = $scope.name

		pt.$save().then(function(res) {
			$store.loadGroupTypes()

			$location.path('/manage/product_type')
		})
	}
})