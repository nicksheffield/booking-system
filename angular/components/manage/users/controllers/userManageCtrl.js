angular.module('app.controllers')

.controller('userManageCtrl', function($scope, $title, $store, $location) {
	$title('Manage Users')
	
	$scope.users = $store.users
	$scope.groups = $store.groups
	
	console.log($scope.users)
	
	$store.loadUsers()
	$store.loadGroups()
	
	$scope.staff = function(user) {
		return user.admin
	}
})