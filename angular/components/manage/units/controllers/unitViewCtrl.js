angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $invalidate, $location, sweetAlert) {
	$scope.unit = $store.get('units', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.unit.$delete().then(function() {
				$invalidate.add(['units', 'products'])
				
				$location.path('/manage/unit')
			})
		})
	}
})