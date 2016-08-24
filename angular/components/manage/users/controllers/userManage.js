angular.module('app.controllers')

.controller('userManage', function($scope, $title, $store, $location) {
	$title('Manage Users')
	
	$scope.users = $store.users
	$scope.groups = $store.groups
	
	$store.loadUsers()
	$store.loadGroups()
	
	$scope.staff = function(user) {
		return user.admin
	}
})