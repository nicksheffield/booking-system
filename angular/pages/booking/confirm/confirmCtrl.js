angular.module('app.controllers')

.controller('confirmCtrl', function($scope, $store, $location, $http, $invalidate) {
	if(!$store.booking.pickup_at) {
		$location.path('/book')
	}

	window.$scope = $scope
	
	$scope.user = $store.user
	$scope.booking = $store.booking
	$scope.allowedProducts = []
	$scope.overallAllowed = true
	$scope.terms = $store.get('settings', {key: 'terms'})
	$scope.reasons = []
	
	$scope.product = (id) => $store.get('products', id)

	_.forEach($scope.booking.products, function(product) {

		$scope.booking.pickup_at = moment($scope.booking.pickup_at).startOf('day')._d

		if(product.limitless) {
			$scope.allowedProducts.push(product.id)
			return
		}

		$http
			.post('/api/product/' + product.id + '/check', {
				pickup_at: $scope.booking.pickup_at,
				due_at: $scope.booking.due_at,
				quantity: product.quantity
			})
			.then(function(res) {
				if(res.data.allowed) {
					$scope.allowedProducts.push(parseInt(res.data.id))
				} else {
					$scope.overallAllowed = false
					$scope.reasons.push({id: parseInt(res.data.id), reason: res.data.reason})
				}
			})
	})

	$scope.allowed = id => $scope.allowedProducts.indexOf(id) >= 0
	$scope.reason  = id => {
		let reason = $scope.reasons.find(x => x.id === id)
		return reason ? reason.reason : ''
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
		return !$scope.overallAllowed || !$scope.booking.due_at || !$scope.booking.pickup_at || !$scope.booking.products.length || !$scope.readTerms
	}
})