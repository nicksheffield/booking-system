angular.module('app.controllers')

.controller('mainCtrl', function($scope, $title, $http, User) {
	$title('Login')

	$scope.login = function() {
		$http.post('/auth/login', {username: $scope.username, password: $scope.password})
	}
})