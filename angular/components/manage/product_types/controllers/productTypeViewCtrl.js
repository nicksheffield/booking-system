angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $store, $location, $flash) {
	$scope.type = $store.get('product_types', $stateParams.id)
	
	$scope.preNewProduct = function() {
		$flash.set('product_type', $scope.type.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$store.invalidate('product_types')

			$location.path('/manage/product_type')
		}
	}
})