angular.module('app.controllers')

.controller('headerCtrl', function($scope, $auth) {
	$scope.auth = $auth
})