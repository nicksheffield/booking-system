angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $store, $state, $location) {
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
				// $store.user = res.data.user
				$store.invalidate('user', 'users', 'units', 'groups', 'products', 'group_types', 'product_types')

				$location.path('/home')
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