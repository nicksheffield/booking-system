angular.module('app.controllers')

.controller('classTypeProductCtrl', function($scope, $stateParams, $store, $load, $location, $http, $timeout, $invalidate, sweetAlert) {
	
	$scope.selectedProducts = [{ quantity: 1, days_allowed: 1 }]
	$scope.user = $store.user
	$scope.kits = $store.kits
	$scope.products = $store.products

	window.$scope = $scope

	$scope.group_type = $load.group_type($stateParams.id)

	$scope.group_type.$promise.then(function(res) {
		console.log('res', res)

		if($scope.group_type.products.length) {
			$scope.selectedProducts = $scope.group_type.products.map(p => {
				return {
					quantity: p.pivot.quantity,
					days_allowed: p.pivot.days_allowed,
					product: p
				}
			})
		}
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
			quantity, product, days_allowed: 1
		})
	}
	
	// calculate the max quantity allowed for a product
	$scope.max = function(product) {
		if(!product) return 1

		return product._max
	}
	
	$scope.save = function() {
		$http
			.post('/api/group_type/' + $scope.group_type.id + '/products', $scope.selectedProducts)
			.then(function(res) {
				$invalidate.add('group_types')
				$location.path('/manage/class-type/' + $scope.group_type.id)
			})
	}
})