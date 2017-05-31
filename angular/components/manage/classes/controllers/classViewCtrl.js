angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, sweetAlert) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.group.$delete().then(function() {
				$invalidate.add('groups')

				$location.path('/manage/class')
			})
		})
	}
})