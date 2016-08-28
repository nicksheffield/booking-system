angular.module('app.controllers')

.controller('unitManageCtrl', function($scope, $store) {
	$scope.units = $store.units
	$store.loadUnits()
})