angular.module('app.controllers')

.controller('sidebarCtrl', function($scope, $auth, $store, $location) {
	$scope.auth = $auth
	$scope.user = $store.user
	
	$scope.isCurrent = function(url) {
		return $location.path() == url
	}
})