angular.module('app.controllers')

.controller('sidebarCtrl', function($scope, $auth, $store) {
	$scope.auth = $auth
	$scope.user = $store.user
})