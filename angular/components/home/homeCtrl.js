angular.module('app.controllers')

.controller('homeCtrl', function($scope, $rootScope, $title, $store, $stateParams, User) {
	$title('Home')

	$scope.user = $store.user
})