angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $location) {

	$scope.selectedProducts = [{ quantity: 1 }]
	$scope.user = $store.user
	$scope.booking = $store.booking

	

	if($store.booking && $store.booking.products && $store.booking.products.length) {
		$scope.selectedProducts = []

		$store.booking.products.forEach(function(p) {
			$scope.selectedProducts.push({
				product: $store.get('products', p.id),
				quantity: p.quantity
			})
		})
	}
	
	if($store.user.admin) {
		$scope.users = $store.users
	} else {
		$scope.users = []
	}

	$scope.user_group = (user) => user.group ? user.group.code : ''
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

	if(!$scope.booking._user) {
		$scope.booking._user = $store.user
	}
	
	if(!$scope.booking.pickup_at) {
		$scope.booking.pickup_at = new Date()
	} else if($scope.booking.due_at && $scope.booking.pickup_at.valueOf() > $scope.booking.due_at.valueOf()) {
		$scope.booking.pickup_at = new Date()
		$scope.booking.due_at = ''
	}
	
	$scope.reset = function() {
		$store.resetBooking()
		$scope.booking.pickup_at = new Date()
		$scope.booking.due_at = undefined
		$scope.booking._user = $store.user
		$scope.selectedProducts = [{ quantity: 1 }]
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
	
	$scope.book = function() {
		$scope.createBooking()
		$location.path('/book/confirm')
	}
	
	$scope.createBooking = function() {
		var payload = []
		
		_.forEach($scope.selectedProducts, function(selected) {
			if(parseInt(selected.quantity) > 0 || selected.product.limitless) {
				if(selected.product) {
					payload.push({
						id: selected.product.id,
						quantity: selected.quantity,
						limitless: selected.product.limitless
					})
				}
			}
		})
		
		$store.setBooking({
			due_at: $scope.booking.due_at,
			pickup_at: $scope.booking.pickup_at,
			products: payload,
			_user: $scope.booking._user
		})
	}
	
	// calculate the max quantity allowed for a product
	$scope.max = function(product) {
		if(!product) return 1

		return product._max
	}

	// load all the products allowed based on the current users group.
	if($store.user.group_id) {
		$scope.group = $store.get('groups', $store.user.group_id)

		if($scope.group) {
			$scope.products = $scope.group.allowed_products

			_.forEach($scope.products, function(product) {
				console.log('product', product)
				product._max = product.pivot.quantity
			})
		}
	
	// if the current user doesn't have a group, give them all the products
	} else {
		$scope.products = $store.products
		
		_.forEach($scope.products, function(product) {
			product._max = product.units.length
			
			if($scope.booking.products && $scope.booking.products.length) {
				var booking = _.find($scope.booking.products, (p) => p.id == product.id)
				
				if(booking) product._quantity = booking.quantity
			}
		})
	}

})