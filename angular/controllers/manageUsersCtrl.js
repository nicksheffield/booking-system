angular.module('app.controllers')

.controller('manageUsersCtrl', function($scope, $title, $store, $location) {
	$title('Manage Users')
	
	$scope.users = $store.users
	$scope.groups = $store.groups
	
	$store.loadUsers()
	$store.loadGroups()
	
	$scope.select = function(user) {
		$location.path('/view_user/'+user.id)
	}
})