angular.module('app.controllers')

.controller('confirmCtrl', function($scope, $store, $location, $http, $invalidate) {
	if(!$store.booking.pickup_at) {
		$location.path('/book')
	}
	
	$scope.user = $store.user
	$scope.booking = $store.booking
	$scope.products = $store.products
	
	$scope.product = (id) => $store.get('products', id)
	
	$scope.confirm = function() {
		if(!$scope.user.can_book) {
			return
		}

		$store.booking.pickup_at = new Date($store.booking.pickup_at)
		$store.booking.due_at = new Date($store.booking.due_at)

		$http.post('/api/booking', $store.booking).then(function(res) {
			$store.resetBooking()
			
			$location.path('/book/success')
		})
	}
})