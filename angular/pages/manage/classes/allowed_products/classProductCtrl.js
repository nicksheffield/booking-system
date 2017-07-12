angular.module('app.controllers')

.controller('classProductCtrl', function($scope, $stateParams, $store, $load, $location, $http, $timeout, $invalidate, sweetAlert) {
	
	$scope.selectedProducts = [{ quantity: 1 }]
	$scope.user = $store.user
	$scope.kits = $store.kits

	window.$scope = $scope

	$scope.group = $load.group($stateParams.id)

	$scope.group.$promise.then(function(res) {
		console.log('res', res)
		$scope.selectedProducts = $scope.group.allowed_products.map(p => {
			return {
				quantity: p.pivot.quantity,
				days_allowed: p.pivot.days_allowed,
				product: p
			}
		})
	})

	$scope.product_type = (product) => product.type ? product.type.name : ''

	$scope.filterAdded = (value, index, array) => {
		if(value.limitless) return true
		var found = false

		$scope.selectedProducts.forEach(v => {
			if(v.product && v.product.id == value.id) {
				found = true
			}
		})

		return !found
	}

	$scope.addProduct = function() {
		$scope.selectedProducts.push({ quantity: 1 })
	}
	
	$scope.removeProduct = function(product, index) {
		$scope.selectedProducts.splice(index, 1)
		
		if(!$scope.selectedProducts.length) {
			$scope.addProduct()
		}
	}

	$scope.trimProducts = function() {
		$scope.selectedProducts = $scope.selectedProducts.filter(p => !!p.product)
	}

	$scope.addKit = function() {

		const kitsList = {}

		$scope.kits.forEach(k => {
			kitsList[k.id] = k.name
		})

		sweetAlert.swal({
			title: 'Which kit?',
			showCancelButton: true,
			input: 'select',
			inputOptions: kitsList,
			inputPlaceholder: 'Please select a kit'
		})
		.then(function(kit) {
			$scope.$apply(function() {
				$scope.importKit($scope.kits.find(k => k.id === parseInt(kit)))
			})
		})
	}

	$scope.importKit = function(kit) {
		if($scope.user.admin) {
			kit._products.forEach((p, i) => {
				$scope.importProduct(p, kit.products[i].pivot.quantity)
			})
		}

		$scope.trimProducts()
	}

	$scope.importProduct = function(product, quantity) {
		$scope.selectedProducts.push({
			quantity, product
		})
	}
	
	// calculate the max quantity allowed for a product
	$scope.max = function(product) {
		if(!product) return 1

		return product._max
	}
	
	$scope.save = function() {
		$http
			.post('/api/group/' + $scope.group.id + '/products', $scope.selectedProducts)
			.then(function(res) {
				console.log(res)
			})
	}
	
	
	
	









	
	
	
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
		_.forEach($scope.products, function(product) {

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

					$scope.saved = true
					
					$invalidate.add(['groups', 'units'])
				})
		} else {
			$http.post('/api/product/'+product.id+'/disallow/'+$scope.group.id)
				.then(function(res) {

					$scope.saved = true
					
					$invalidate.add(['groups', 'units'])
				})
		}
	}

})