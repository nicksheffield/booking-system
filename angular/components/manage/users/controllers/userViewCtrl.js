angular.module('app.controllers')

.controller('userViewCtrl', function($scope, $stateParams, $store, $invalidate, $location) {
	$scope.user = $store.get('users', $stateParams.id)
	
	if($scope.user.admin == 1 && $scope.user.group && !$scope.user.group._isTutor($store.user.id)) {
		$location.path('/manage/user')
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.user.$delete().then(function() {
				$invalidate.add(['users', 'groups', 'bookings'])
				
				$location.path('/manage/user')
			})
		}
	}
})