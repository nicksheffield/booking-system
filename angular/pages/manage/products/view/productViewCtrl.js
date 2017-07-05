angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location, $invalidate, sweetAlert) {
	$scope.product = $store.get('products', $stateParams.id)

	$scope.orderByUnit = function(item) {
		return parseInt(item.unit_number)
	}
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.product.$delete().then(function() {
				$invalidate.add(['products', 'product_types', 'units'])
				
				$location.path('/manage/product')
			})
		})
	}
})