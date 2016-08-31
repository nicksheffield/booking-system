angular.module('app.controllers')

.controller('productTypeEditCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$scope.type = $store.get('product_types', $stateParams.id)
	
	$scope.save = function() {
		Product_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.invalidate('product_types', 'products')

			$location.path('/manage/product_type/' + $scope.type.id)
		})
	}
})