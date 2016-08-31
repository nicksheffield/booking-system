angular.module('app.controllers')

.controller('classTypeManageCtrl', function($scope, $store) {
	$scope.group_types = $store.group_types
})