angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $title) {
	$title('Book Equipment')
	$scope.user = $store.user	
	$store.loadAuthUser()

	$scope.items = []
	
	$scope.addItem = function() {
		$scope.items.push({
			product: null,
			quantity: 1
		})
	}
	
	$scope.removeItem = function(index) {
		$scope.items.splice(index, 1)
		
		if(!$scope.items.length) {
			$scope.addItem()
		}
	}
	
	$scope.addItem()
	
	$store.user.$promise.then(function() {
		$store.groups.$promise.then(function() {
			$scope.group = _.find($store.groups, function(group) {
				return $store.user.group_id == group.id
			})
			
			if(!$scope.group) {
				$scope.products = $store.products
			} else {
				$scope.products = $scope.group.allowed_products
			}
		})
	})
})