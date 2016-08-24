angular.module('app.controllers')

.controller('userNewCtrl', function($scope, $stateParams, $store, $location, User) {

	$scope.save = function() {
		var u = new User()
		
		u.first_name = $scope.first_name
		u.last_name = $scope.last_name
		u.email = $scope.email
		u.phone = $scope.phone
		u.dob = $scope.dob
		u.id_number = $scope.id_number
		u.group_id = $scope.group.id
		u.password = $scope.password
		
		u.$save().then(function(res) {
			console.log('save', res)

			var credentials = {
				username: res.username,
				password: $scope.password
			}

			$auth
				.login(credentials)
				.then(function(res) {
					console.log('res', res)
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