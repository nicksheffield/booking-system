angular.module('app.controllers')

.controller('productManageCtrl', function($scope, $store) {
	$scope.products = $store.products
})