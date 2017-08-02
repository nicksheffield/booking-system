angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $load, $prepare, $invalidate, $location, sweetAlert) {
	

	$scope.unit = $load.unit($stateParams.id, {with: 'bookings'})

	$scope.unit.$promise.then(u => {
		u._bookings = $prepare.bookings(u.bookings)
	})
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.unit.$delete().then(function() {
				$invalidate.add(['units', 'products'])
				
				$location.path('/unit')
			})
		})
	}
})