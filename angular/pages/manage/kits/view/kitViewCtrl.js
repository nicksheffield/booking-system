angular.module('app.controllers')

.controller('kitViewCtrl', function($scope, $stateParams, $store, $invalidate, $location, sweetAlert) {
	$scope.kit = $store.get('kits', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.kit.$delete().then(function() {
				$invalidate.add('kits')

				$location.path('/kit')
			})
		})
	}

	$scope.dataTable = {
		items: $scope.kit.products,
		buttons: ['view', 'edit'],
		slug: 'product',
		cols: [
			{
				name: 'Product',
				prop: 'name'
			},
			{
				name: 'Quantity',
				prop: x => x.limitless ? 'N/A' : x.pivot.quantity
			},
		]
	}
})