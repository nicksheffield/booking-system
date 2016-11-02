angular.module('app.controllers')

.controller('editBookingCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.user = $store.user
	$scope.booking = $store.get('bookings', $stateParams.id)
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
		minDate: new Date(),
	}
	
	console.log('before', $scope.booking.pickup_at)
	
	$scope.select2Options = {
		selectOnClose: true
	}
	
	$scope.save = function() {
		
		if($scope.booking._priority == 1) {
			
			$scope.booking.products = []
			
			_.forEach($scope.products, function(product) {
				if(!product._quantity) return
					
				$scope.booking.products.push({
					id: product.id,
					quantity: product._quantity
				})
			})

			$http.put('/api/booking/' + $scope.booking.id, $scope.booking).then(function(res) {
				$invalidate.add('bookings')
				
				$location.path('/booking/' + $scope.booking.id)
			})
		}
	}
	
	// load all the products allowed based on the current users group.
	// if the current user doesn't have a group, give them all the products
	$scope.group = $store.get('groups', $store.user.group_id)
	
	if(!$scope.group) {
		$scope.products = $store.products
		
		_.forEach($scope.products, function(product) {
			product._max = product.units.length
			product._quantity = undefined
		})
	} else {
		$scope.products = $scope.group.allowed_products
		
		_.forEach($scope.products, function(product) {
			product._max = product.pivot.quantity
			product._quantity = undefined
		})
	}
	
	// set up the fake quantity values
	$scope.booking.products.forEach(function(bookedProduct) {
		var product = _.find($scope.products, (p) => p.id == bookedProduct.id)
		
		if(!product._quantity) product._quantity = 0
		product._quantity += 1
	})
})