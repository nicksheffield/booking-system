angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $state, $store, $location, $flash) {
	$store.loadProductTypes()
	
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.preNewProduct = function() {
		$flash.set('product_type', $scope.type.id)
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$store.loadProductTypes()
				$location.path('/manage/product_type')
			})
		}
	}
})