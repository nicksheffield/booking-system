angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $stateParams) {
	$scope.bookings = $store.bookings
	$scope.units = $store.units

	$scope.showClosed = false

	$scope.showClosed = localStorage.getItem('showClosed') == 'true' || false

	$scope.toggleClosed = function(){
		$scope.showClosed = !$scope.showClosed
		localStorage.setItem('showClosed', $scope.showClosed)
	}

	if($stateParams.user) $scope.filteredUser = $store.get('users', $stateParams.user)
	if($stateParams.group) $scope.filteredGroup = $store.get('groups', {code: $stateParams.group})

	console.log('group', $scope.filteredGroup)
	
	$scope.userFilter = value => !$stateParams.user || value.user && value.user.id == $scope.filteredUser.id
	$scope.groupFilter = value => !$stateParams.group || value.user.group && value.user.group.id == $scope.filteredGroup.id

	$scope.group = id => _.find($store.groups, {id: id})

	$scope.showClosedFilter = function(value, index, array) {
		if(!$scope.showClosed && value.closed_at) {
			return false
		} else {
			return true
		}
	}
})