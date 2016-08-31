angular.module('app.controllers')

.controller('userViewCtrl', function($scope, $stateParams, $store) {
	$scope.user = $store.get('users', $stateParams.id)
})