angular.module('app.controllers')

.controller('headerCtrl', function($scope, $auth, $store) {
	$scope.auth = $auth
	$scope.user = $store.user
})