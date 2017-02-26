angular.module('app.controllers')

.controller('classProductCtrl', function($scope, $stateParams, $store, $location, $http, $timeout, $invalidate) {
	$store.groups.$promise.then(function() {
		$scope.group = _.clone($store.get('groups', $stateParams.id))
		
		$scope.products = $store.products
		
		_.forEach($scope.products, function(product) {
			_.forEach($scope.group.allowed_products, function(a) {
				if(a.id == product.id) {
					product._allowed = true
					product._quantity = a.pivot.quantity
					product._days_allowed = a.pivot.days_allowed
				}
			})
			
			if(!product._quantity) {
				product._quantity = 1
			}
			
			if(!product._days_allowed) {
				product._days_allowed = 1
			}
		})
	})
	
	$timeout(function() {
		$scope.update = function(product) {
			if(product._allowed) {
				$scope.saved = false
				$http.put('/api/product/'+product.id+'/allow/'+$scope.group.id, {
					quantity: product._quantity,
					days_allowed: product._days_allowed
				})
					.then(function(res) {
						// console.log('res3', res)
						$scope.saved = true
						
						$invalidate.add(['groups', 'units'])
					})
			}
		}
	}, 1000)
	
	$scope.allow = function(product) {
		$scope.saved = false
		if(product._allowed) {
			$http.post('/api/product/'+product.id+'/allow/'+$scope.group.id, {
				quantity: product._quantity,
				days_allowed: product._days_allowed
			})
				.then(function(res) {
					// console.log('res1', res)
					$scope.saved = true
					
					$invalidate.add(['groups', 'units'])
				})
		} else {
			$http.post('/api/product/'+product.id+'/disallow/'+$scope.group.id)
				.then(function(res) {
					// console.log('res2', res)
					$scope.saved = true
					
					$invalidate.add(['groups', 'units'])
				})
		}
	}

})