angular.module('app.controllers')

.controller('viewUserCtrl', function($scope, $stateParams, $store, $location) {
	$store.users.$promise.then(function() {
		$scope.user = _.find($store.users, function(user) {
			return user.id == $stateParams.id
		})
	})
	
	$scope.delete = function() {
		$scope.user.$delete().then(function() {
			$store.loadUsers()
			$location.path('/manage/users')
		})
	}
})