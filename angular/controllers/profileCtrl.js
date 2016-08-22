angular.module('app.controllers')

.controller('profileCtrl', function($scope, $title, $store, $stateParams, User) {
	

	// Get the user we asked for
	$store.users.$promise.then(function() {
		$scope.user = _.find($store.users, function(user) {
			return user.username == $stateParams.username
		})

		$title($scope.user.first_name + ' ' + $scope.user.last_name)
	})
})