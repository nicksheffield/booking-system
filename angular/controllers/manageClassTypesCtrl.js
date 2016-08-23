angular.module('app.controllers')

.controller('manageClassTypesCtrl', function($scope, $store) {
	$store.loadGroupTypes()
	
	$scope.group_types = $store.group_types
})