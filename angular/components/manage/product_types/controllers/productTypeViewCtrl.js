angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $state, $store, $location, $flash) {
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, (t) => t.id == $stateParams.id)
	})
	
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