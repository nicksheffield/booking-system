angular.module('app.controllers')

.controller('productTypeManageCtrl', function($scope, $store) {
	$store.loadProductTypes()
	
	$scope.product_types = $store.product_types
	
	console.log($scope.product_types)
})