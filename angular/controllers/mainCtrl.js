angular.module('app.controllers')

.controller('mainCtrl', function($scope, $title, $auth, $state) {
	$title('Login')

	$scope.login = function() {
		
		var credentials = {
			username: $scope.username,
			password: $scope.password
		}
		
		$auth.login(credentials).then(function(data) {
			$state.go('secret', {})
		})
	}
})