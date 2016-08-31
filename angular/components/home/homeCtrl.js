angular.module('app.controllers')

.controller('homeCtrl', function($scope, $rootScope, $store, $stateParams, User) {
	$scope.user = $store.loadAuthUser()
})