angular.module('app.controllers')

.controller('secretCtrl', function($scope, $title, $auth, $state, User) {
	$title('Secret!')
	
	$scope.users = User.query()
})