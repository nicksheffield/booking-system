angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $title) {
	$title('Book Equipment')
	$scope.user = $store.user
	// $store.loadAuthUser()

	window.scope = $scope
	
	$scope.checkAgainstMax = function(product) {
		var max = $scope.max(product)

		console.log('What', product)
		console.log(product._quantity, product._max, product._quantity > product._max)

		if(product._quantity > product._max) {
			product._quantity = 1
		}
		if(product._quantity === undefined) {
			product._quantity = product._max
		}
	}
	
	// calculate the max quantity allowed for a product
	$scope.max = function(product) {
		return product._max
	}
	
	// load all the products allowed based on the current users group.
	// if the current user doesn't have a group, give them all the products
	$store.user.$promise.then(function() {
		$store.groups.$promise.then(function() {
			$scope.group = _.find($store.groups, function(group) {
				return $store.user.group_id == group.id
			})
			
			if(!$scope.group) {
				$store.loadProducts()
				$scope.products = $store.products

				$scope.products.$promise.then(function() {
					_.forEach($scope.products, function(product) {
						product._max = product.units.length
					})
				})
			} else {
				$scope.products = $scope.group.allowed_products

				_.forEach($scope.products, function(product) {
					product._max = product.pivot.quantity
				})
			}
		})
	})
})