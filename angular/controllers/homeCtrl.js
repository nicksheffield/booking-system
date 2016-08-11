angular.module('app.controllers')

.controller('homeCtrl', function($scope, $title, $store, User) {
	$title('Secret Staff!')
	$scope.users = User.query()
	$scope.user = $store.user
})