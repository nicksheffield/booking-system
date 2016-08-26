angular.module('app.controllers')

.controller('productTypeEditCtrl', function($scope, $stateParams, $store, $location, Product_Type) {
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.save = function() {
		Product_Type.update({id: $scope.type.id}, $scope.type).$promise.then(function(res) {
			$store.loadProductTypes()
			$location.path('/manage/product_type/' + $scope.type.id)
		})
	}
})