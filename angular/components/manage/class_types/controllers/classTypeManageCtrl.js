angular.module('app.controllers')

.controller('classTypeManageCtrl', function($scope, $store) {
	$store.loadGroupTypes()
	
	$scope.group_types = $store.group_types
})