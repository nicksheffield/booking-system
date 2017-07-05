angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, sweetAlert) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	window.scope = $scope
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.type.$delete().then(function() {
				$invalidate.add('group_types')
				
				$location.path('/manage/class-type')
			})
		})
	}
})