angular.module('app.controllers')

.controller('homeCtrl', function($scope, $title, $store, User) {
	$title('Home')
	
	$scope.users = User.query()
	
	$scope.user = $store.user
})