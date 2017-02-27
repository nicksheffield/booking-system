angular.module('app.controllers')

.controller('manageCtrl', function($scope, $store) {
	$scope.user = $store.user
	$scope.store = $store
})