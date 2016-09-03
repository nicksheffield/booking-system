angular.module('app.controllers')

.controller('userEditCtrl', function($scope, $stateParams, $store) {
	$scope.user = $store.get('users', $stateParams.id)
	$scope.selected = {
		group: $store.get('groups', $scope.user.group.id)
	}
})