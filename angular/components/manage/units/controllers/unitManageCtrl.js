angular.module('app.controllers')

.controller('unitManageCtrl', function($scope, $store) {
	$scope.units = $store.units

	$scope.product_id  = u => u.product ? u.product.id : 0
	$scope.unit_number = u => u.unit_number
})