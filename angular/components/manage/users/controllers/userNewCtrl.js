angular.module('app.controllers')

.controller('userNewCtrl', function($scope, $stateParams, $store, $location, User) {
	
	var group = $stateParams['class']
	
	$scope.groups = $store.groups
	$scope.selected = { group: {} }
	
	if(group) {
		$scope.selected.group = $store.get('groups', {code: group})
	}
	

	$scope.save = function() {
		var u = new User()
		
		u.dob        = $scope.dob
		u.name       = $scope.name
		u.email      = $scope.email
		u.phone      = $scope.phone
		u.group_id   = $scope.selected.group.id
		u.password   = $scope.password
		u.id_number  = $scope.id_number
		
		u.$save().then(function(res) {

			var credentials = {
				name: res.name,
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