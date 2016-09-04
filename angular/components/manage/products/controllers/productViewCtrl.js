angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location) {
	$scope.product = $store.get('products', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.product.$delete().then(function() {
				$store.invalidate(['products', 'product_types', 'units'])
				
				$location.path('/manage/product')
			})
		}
	}
})