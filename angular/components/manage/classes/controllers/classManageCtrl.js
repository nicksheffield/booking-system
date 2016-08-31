angular.module('app.controllers')

.controller('classManageCtrl', function($scope, $store) {
	$scope.groups = $store.groups
})