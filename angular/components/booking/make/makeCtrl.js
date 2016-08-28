angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $title) {
	$title('Book Equipment')
	$scope.user = $store.user
	$store.loadAuthUser()

	$scope.items = []
	window.scope = $scope
	
	// Watch for when the select menu changes, and when it does, make sure

	
	$scope.resetQuantity = function(index) {
		$scope.items[index].quantity = 1
	}
	
	// add a row
	$scope.addItem = function() {
		$scope.items.push({
			product: null,
			quantity: 1
		})
	}
	
	// remove a row
	$scope.removeItem = function(index) {
		$scope.items.splice(index, 1)
		
		if(!$scope.items.length) {
			$scope.addItem()
		}
	}
	
	// auto add the first row
	$scope.addItem()
	
	// calculate the max quantity allowed for a product
	$scope.max = function(index) {
		if(index === undefined) return ''
		if(!$scope.group) {
			if($scope.items[index].value) {
				return $scope.items[index].value.units.length
			} else {
				return ''
			}
		} else {
			var product = $scope.items[index].value
			
			if(!product) return ''
			var found_product = _.find($scope.group.allowed_products, function(allowed_product) {
				return allowed_product.id == product.id
			})
			
			return found_product.pivot.quantity
		}
	}
	
	// load all the products allowed based on the current users group.
	// if the current user doesn't have a group, give them all the products
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