angular.module('app.controllers')

.controller('unitViewCtrl', function($scope, $stateParams, $state, $store, $load, $prepare, $invalidate, $location, sweetAlert) {
	window.$scope = $scope
	$scope.unit = $load.unit($stateParams.id, {with: 'bookings'})

	$scope.unit.$promise.then(u => {
		u._bookings = $prepare.bookings(u.bookings)
	})
	.then(() => {
		$scope.dataTable = {
			items: $scope.unit.bookings,
			buttons: ['view', 'edit'],
			slug: 'booking',
			cols: [
				{
					name: 'User',
					prop: x => x.user.name
				},
				{
					name: 'Issued',
					prop: x => x.taken_at ? moment(x.taken_at).format('YYYY-MM-DD') : ''
				},
				{
					name: 'Returned',
					prop: x => x.pivot.returned_at ? moment(x.pivot.returned_at).format('YYYY-MM-DD') : ''
				},
				{
					name: 'Notes',
					prop: x => x.pivot.notes
				},
			]
		}
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