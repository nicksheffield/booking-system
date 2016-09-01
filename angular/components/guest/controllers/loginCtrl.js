angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $store, $state, $location) {
	$scope.$watch('username', reset)
	$scope.$watch('password', reset)
	
	function reset() {
		$scope.error = ''
	}

	$scope.login = function() {
		if(!$scope.username || !$scope.password) {
			return false
		}
		
		var credentials = {
			username: $scope.username,
			password: $scope.password
		}
		
		$auth
			.login(credentials)
			.then(function(res) {
				// $store.user = res.data.user
				$store.invalidate('user')
				$store.invalidate('users')
				$store.invalidate('units')
				$store.invalidate('groups')
				$store.invalidate('products')
				$store.invalidate('group_types')
				$store.invalidate('product_types')

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