angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $store, $invalidate, $location, sweetAlert) {
	$scope.type = $store.get('product_types', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.type.$delete().then(function() {
				$invalidate.add('product_types')

				$location.path('/manage/product-type')
			})
		})


	}
})