angular.module('app.controllers')

.controller('confirmCtrl', function($scope, $store, $location, $http, $invalidate) {
	if(!$store.booking.pickup_at) {
		$location.path('/book')
	}

	window.scope = $scope
	
	$scope.user = $store.user
	$scope.booking = $store.booking
	$scope.allowedProducts = []
	$scope.overallAllowed = true
	
	$scope.product = (id) => $store.get('products', id)

	_.forEach($scope.booking.products, function(product) {

		$scope.booking.pickup_at = moment($scope.booking.pickup_at).startOf('day')._d

		$http
			.post('/api/product/' + product.id + '/check', {pickup_at: $scope.booking.pickup_at, due_at: $scope.booking.due_at})
			.then(function(res) {
				if(res.data.allowed) {
					$scope.allowedProducts.push(parseInt(res.data.id))
				} else {
					$scope.overallAllowed = false
				}
			})
	})

	$scope.allowed = function(id) {
		return $scope.allowedProducts.indexOf(id) >= 0
	}
	
	$scope.confirm = function() {
		if(!$scope.user.can_book) {
			return
		}

		$store.booking.pickup_at = new Date($store.booking.pickup_at)
		$store.booking.due_at = new Date($store.booking.due_at)

		$http.post('/api/booking', $store.booking).then(function(res) {
			$store.resetBooking()
			
			$invalidate.add('booking_count')
			$location.path('/book/success')
		})
	}

	$scope.disableSubmit = function() {
		return !$scope.overallAllowed || !$scope.booking.due_at || !$scope.booking.pickup_at || !$scope.booking.products.length
	}
})