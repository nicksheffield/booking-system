angular.module('app.controllers')

.controller('classProductCtrl', function($scope, $stateParams, $store, $location, $http) {
	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, function(group) {
			return group.id == $stateParams.id
		})
		
		console.log('group', $scope.group)
		
		$store.loadProducts()
		
		$scope.products = $store.products
		
		// when all the products are ready
		$scope.products.$promise.then(function() {
			// for each of them
			_.forEach($scope.products, function(product) {
				// loop through every allowed product for this group
				for(var i=0; i<$scope.group.allowed_products.length; i++) {
					// if this allowed product is the same as this product
					var allowed = $scope.group.allowed_products[i]
					if(allowed.id == product.id) {
						product._allowed = true
						
						product._quantity = allowed.pivot.quantity
						product._days_allowed = allowed.pivot.days_allowed
					}
				}
				
				if(!product._quantity) {
					product._quantity = 1
				}
				
				if(!product._days_allowed) {
					product._days_allowed = 1
				}
			})
		})
	})
	
	$scope.update = function(product) {
		if(product._allowed) {
			$scope.saved = false
			$http.put('/api/product/'+product.id+'/allow/'+$scope.group.id, {
				quantity: product._quantity,
				days_allowed: product._days_allowed
			})
				.then(function(res) {
					console.log('res3', res)
					$scope.saved = true
				})
		}
	}
	
	$scope.allow = function(product) {
		$scope.saved = false
		if(product._allowed) {
			$http.post('/api/product/'+product.id+'/allow/'+$scope.group.id, {
				quantity: product._quantity,
				days_allowed: product._days_allowed
			})
				.then(function(res) {
					console.log('res1', res)
					$scope.saved = true
				})
		} else {
			$http.post('/api/product/'+product.id+'/disallow/'+$scope.group.id)
				.then(function(res) {
					console.log('res2', res)
					$scope.saved = true
				})
		}
	}

})