angular.module('app.controllers')

.controller('makeCtrl', function($scope, $store, $location) {
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
		minDate: new Date(),
	}
	
	if($store.user.admin) {
		$scope.users = $store.users
	} else {
		$scope.users = []
	}
	
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
	} else if($scope.booking.pickup_at.valueOf() < new Date().valueOf()) {
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
	
	$scope.book = function() {
		$scope.createBooking()
		$location.path('/book/confirm')
	}
	
	$scope.createBooking = function() {
		var payload = []
		
		_.forEach($scope.products, function(product) {
			if(parseInt(product._quantity) > 0) {
				payload.push({
					id: product.id,
					quantity: product._quantity
				})
			}
		})
		
		$store.setBooking({
			due_at: $scope.booking.due_at,
			pickup_at: $scope.booking.pickup_at,
			products: payload,
			_user: $scope.booking._user
		})

		console.log($store.booking)
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
		return product._max
	}
	
	// load all the products allowed based on the current users group.
	// if the current user doesn't have a group, give them all the products
	$scope.group = $store.get('groups', $store.user.group_id)
	
	if(!$scope.group) {
		$scope.products = $store.products
		
		_.forEach($scope.products, function(product) {
			product._max = product.units.length
			
			if($scope.booking.products && $scope.booking.products.length) {
				var booking = _.find($scope.booking.products, (p) => p.id == product.id)
				
				if(booking) product._quantity = booking.quantity
			}
		})
	} else {
		$scope.products = $scope.group.allowed_products

		_.forEach($scope.products, function(product) {
			product._max = product.pivot.quantity
		})
	}

})