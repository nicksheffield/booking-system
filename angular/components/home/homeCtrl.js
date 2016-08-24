angular.module('app.controllers')

.controller('homeCtrl', function($scope, $title, $store, $stateParams, User) {
	$title('Home')

	$scope.user = $store.user

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
})