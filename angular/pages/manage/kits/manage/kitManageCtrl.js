angular.module('app.controllers')

.controller('kitManageCtrl', function($scope, $store) {
	$scope.kits = $store.kits

	window.$scope = $scope
})