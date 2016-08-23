angular.module('app.controllers')

.controller('editUserCtrl', function($scope, $stateParams, $store) {
	$store.users.$promise.then(function() {
		$scope.user = _.find($store.users, function(user) {
			return user.id == $stateParams.id
		})
	})
})