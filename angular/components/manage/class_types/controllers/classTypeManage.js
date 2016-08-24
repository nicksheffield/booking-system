angular.module('app.controllers')

.controller('classTypeManage', function($scope, $store) {
	$store.loadGroupTypes()
	
	$scope.group_types = $store.group_types
})