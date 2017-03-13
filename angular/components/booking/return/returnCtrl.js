angular.module('app.controllers')

.controller('returnCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	
	$scope.booking.products
		.map((p) => {
			p.returned = !!p.pivot.returned_at
			return p
		})
		.map((p) => {
			p.locked = !!p.pivot.returned_at
			return p
		})

	$scope.unit = function(id) {
		return $store.get('units', id)
	}

	$scope.close = function() {

		if($scope.booking.products.length == _.filter($scope.booking.products, (p) => p.returned).length) {
			$scope.booking.closed_at = new Date()
			$scope.booking.closed_by_id = $store.user.id
		}

		_.forEach($scope.booking.products, function(product) {
			if(product.returned) product.returned_at = new Date()
		})

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function(res) {
				$store.bookings = _.map($store.bookings, function(booking, i) {
					if(booking.id == res.id) $store.bookings[i] = res
				})

				$location.path('/booking/' + $scope.booking.id)
			})
	}
	
})