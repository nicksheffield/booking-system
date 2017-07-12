angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $store, $state, $location, $invalidate, $load, User, Idle) {
	$scope.$watch('email', reset)
	$scope.$watch('password', reset)
	
	function reset() {
		$scope.error = ''
	}

	$scope.login = function() {
		if(!$scope.email || !$scope.password) {
			return false
		}
		
		var credentials = {
			email: $scope.email,
			password: $scope.password
		}
		
		$auth
			.login(credentials)
			.then(function(res) {
				$store.user = new User(res.data.user)
				
				$load.trigger('user', $store.user)
				
				$invalidate.all()

				Idle.watch()

				$location.path('/home')
			})
			.catch(function(res) {
				console.log(res.data)
				if(res.data.error == 'invalid_credentials') {
					$scope.error = 'Email or password is invalid.'
				} else {
					$scope.error = 'Unknown error'
				}
			})
	}
})