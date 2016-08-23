angular.module('app.controllers')

.controller('profileCtrl', function($scope, $title, $store, $stateParams, User) {
	
	$scope.you = function() {
		return $scope.user.username == $stateParams.username
	}

	$scope.role = function() {
		if($scope.user) return $scope.user.admin ? 'Staff' : 'Student'
	}

	$scope.staff = function() {
		if($scope.user) return $scope.role() == 'Staff'
	}

	$scope.student = function() {
		if($scope.user) return $scope.role() == 'Student'
	}

	// Get the user we asked for
	$store.users.$promise.then(function() {
		$scope.user = _.find($store.users, function(user) {
			return user.username == $stateParams.username
		})

		if(!$scope.user) {
			$scope.error = 'No user found with username: ' + $stateParams.username
			$title($stateParams.username)
		} else {
			$title($scope.user.first_name + ' ' + $scope.user.last_name)
		}
	})
})