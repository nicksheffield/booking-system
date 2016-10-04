angular.module('app.controllers')

.controller('issueCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	
	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
		minDate: new Date(),
	}

	$scope.select2Options = {
		selectOnClose: true
	}
	
	$scope.openPickup = function() {
		$scope.openPickupDate = $scope.openPickupDate ? false : true
	}
	
	$scope.openDue = function() {
		$scope.openDueDate = $scope.openDueDate ? false : true
	}

	$scope.issue = function() {
		$scope.booking.taken_at = new Date()

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function(res) {
				$invalidate.add('bookings')

				$location.path('/bookings/' + $scope.booking.id)
			})
	}

	$scope.isntSelected = function(currentProduct) {
		return function(value, index, array) {
			var notSelected = true

			_.forEach($scope.booking.products, function(product) {
				if(currentProduct == product) return

				if(product.unit && product.unit.id == value.id) {
					notSelected = false
				}
			})

			return notSelected
		}
	}

})