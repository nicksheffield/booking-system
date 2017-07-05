angular.module('app.controllers')

.controller('productTypeManageCtrl', function($scope, $store) {
	$scope.product_types = $store.product_types
})