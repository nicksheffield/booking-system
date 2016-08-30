angular.module('app.controllers')

.controller('registerCtrl', function($scope, $auth, $store, $state, $location, User) {
	$scope.groups = $store.groups
	
	$scope.first_name = 'Nick'
	$scope.last_name = 'Sheffield'
	$scope.email = 'numbereft@gmail.com'
	$scope.phone = '0211099442'
	$scope.dob = new Date(632401200000)
	$scope.id_number = '124567'
	$scope.password = 'abcd'
	$scope.confirm_password = 'abcd'

	$scope.register = function() {
		// if(!$scope.username || !$scope.password) {
		// 	return false
		// }
		
		var u = new User()
		
		u.first_name = $scope.first_name
		u.last_name = $scope.last_name
		u.email = $scope.email
		u.phone = $scope.phone
		u.dob = $scope.dob
		u.id_number = $scope.id_number
		u.group_id = $scope.group_id
		u.password = $scope.password
		
		u.$save().then(function(res) {

			var credentials = {
				username: res.username,
				password: $scope.password
			}

			$auth
				.login(credentials)
				.then(function(res) {
					$store.user = res.data.user
					$location.path('/home')
				})
				.catch(function(res) {
					if(res.data.error == 'invalid_credentials') {
						$scope.error = 'Username or password is invalid.'
					} else {
						$scope.error = 'Unknown error'
					}
				})
		}).catch(function(res) {
			console.log('save err', res)
		})
	}
})