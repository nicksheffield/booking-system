angular.module('app.controllers')

.controller('unitManageCtrl', function($scope, $store) {
	$scope.units = $store.units

	$scope.product_id  = u => u.product_id
	$scope.unit_number = u => u.unit_number
})