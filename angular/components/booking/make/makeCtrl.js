angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $location) {

	window.scope = $scope

	$scope.selectedProducts = [{ quantity: 1 }]

	console.log('$store.booking', $store.booking)

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
	
	$scope.openPickup = function() {
		$scope.openPickupDate = $scope.openPickupDate ? false : true
	}
	
	$scope.openDue = function() {
		$scope.openDueDate = $scope.openDueDate ? false : true
	}
	
	$scope.user = $store.user
	
	$scope.booking = $store.booking

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
		
		_.forEach($scope.products, function(product) {
			product._quantity = undefined
		})
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
			if(parseInt(selected.quantity) > 0) {
				payload.push({
					id: selected.product.id,
					quantity: selected.quantity
				})
			}
		})
		
		$store.setBooking({
			due_at: $scope.booking.due_at,
			pickup_at: $scope.booking.pickup_at,
			products: payload,
			_user: $scope.booking._user
		})
	}
	
	$scope.checkAgainstMax = function(product) {
		var max = $scope.max(product)

		if(product._quantity > product._max) {
			product._quantity = 1
		}
		if(product._quantity === undefined) {
			product._quantity = product._max
		}
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