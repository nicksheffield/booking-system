angular.module('app.controllers')

.controller('mainCtrl', function($scope, $title, $auth, $state) {
	$title('Login')

	$scope.login = function() {
		
		var credentials = {
			username: $scope.username,
			password: $scope.password
		}
		
		$auth
			.login(credentials)
			.then(function(res) {
				$state.go('secret', {})
			})
			.catch(function(res) {
				console.log(res)
				$scope.error = 'Wrong username/password'
			})
	}
})