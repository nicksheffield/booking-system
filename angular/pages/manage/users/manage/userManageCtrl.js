angular.module('app.controllers')

.controller('userManageCtrl', function($scope, $store, $location) {
	$scope.users = $store.users
})