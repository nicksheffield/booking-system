angular.module('app.controllers')

.controller('loginCtrl', function($scope, $title, $auth, $store, $state) {
	$title('Login')
	
	$scope.$watch('username', reset)
	$scope.$watch('password', reset)
	
	function reset() {
		$scope.error = ''
	}

	$scope.login = function() {
		if(!$scope.username || !$scope.password){
			return false
		}
		
		var credentials = {
			username: $scope.username,
			password: $scope.password
		}
		
		$auth
			.login(credentials)
			.then(function(res) {
				console.log('res', res)
				$store.user = res.data.user
				$state.go('home', {})
			})
			.catch(function(res) {
				if(res.data.error == 'invalid_credentials') {
					$scope.error = 'Username or password is invalid.'
				} else {
					$scope.error = 'Unknown error'
				}
			})
	}
})