angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$store.loadProductTypes()
	
	$store.product_types.$promise.then(function() {
		$scope.type = _.find($store.product_types, function(type) {
			return type.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.type.$delete().then(function() {
			$store.loadProductTypes()
			$location.path('/manage/product_types')
		})
	}
})