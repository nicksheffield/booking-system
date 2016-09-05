angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $store, $state, $location, $invalidate, $load, User) {
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
				$store.user = new User(res.data.user)
				
				$load.trigger('user', $store.user)
				
				if($auth.getPayload().admin) {
					$invalidate.add(['user', 'users', 'units', 'groups', 'products', 'group_types', 'product_types', 'bookings'])
				} else {
					$invalidate.add(['user', 'bookings'])
				}

				$location.path('/home')
			})
			.catch(function(res) {
				if(res.data.error == 'invalid_credentials') {
					$scope.error = 'Email or password is invalid.'
				} else {
					$scope.error = 'Unknown error'
				}
			})
	}
})