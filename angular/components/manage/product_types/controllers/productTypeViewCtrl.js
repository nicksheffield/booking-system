angular.module('app.controllers')

.controller('productTypeViewCtrl', function($scope, $stateParams, $store, $invalidate, $location) {
	$scope.type = $store.get('product_types', $stateParams.id)
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.type.$delete().then(function() {
				$invalidate.add('product_types')

				$location.path('/manage/product_type')
			})
		}
	}
})