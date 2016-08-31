angular.module('app.controllers')

.controller('productTypeEditCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, (t) => t.id == $stateParams.id)
	})
	
	$scope.save = function() {
		Product_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.invalidate('product_types')

			$location.path('/manage/product_type/' + $scope.type.id)
		})
	}
})