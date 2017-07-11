angular.module('app.controllers')

.controller('returnCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, $load) {
	$scope.errors = []
	$scope.booking = $store.get('bookings', $stateParams.id)

	window.$scope = $scope

	if(!$scope.booking) {
		$scope.booking = $load.booking($stateParams.id)
	}

	$scope.booking.$promise.then(p => {
			p.products
				.map((p) => {
					p.returned = !!p.pivot.returned_at
					p.locked = !!p.pivot.returned_at
				})
		}, function(err) {
		$scope.errors.push({message: err.data.error})
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

		// console.log($scope.booking.products); return;
		$scope.booking._req_type = 'return'

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function(res) {
				$store.bookings = _.map($store.bookings, function(booking, i) {
					if(!booking) return
					if(booking.id == res.id) $store.bookings[i] = res
				})


				$load.booking_count()

				$location.path('/booking/' + $scope.booking.id)
			})
	}
	
})