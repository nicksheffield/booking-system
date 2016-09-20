angular.module('app.controllers')

.controller('returnCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)

	console.log($scope.booking)

	$scope.unit = function(id) {
		return $store.get('units', id)
	}

	$scope.close = function() {
		console.log('closed', $scope.booking)

		if($scope.booking.products.length == _.filter($scope.booking.products, (p) => p.returned).length) {
			$scope.booking.closed_at = new Date()
		}

		_.forEach($scope.booking.products, function(product) {
			if(product.returned) product.returned_at = new Date()
		})

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function(res) {
				$invalidate.add('bookings')
			})
	}
	
})