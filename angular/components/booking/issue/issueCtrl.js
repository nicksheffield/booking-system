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
		
		var allChosen = $scope.booking.products
			.reduce(function(prev, cur) {
				return prev && !!cur.unit
			}, true)
		
		if(allChosen) {
			$scope.booking.taken_at = new Date()
			$scope.booking.issued_by_id = $store.user.id
			
			$http
				.put('/api/booking/' + $scope.booking.id, $scope.booking)
				.then(function(res) {
					$store.bookings = _.map($store.bookings, function(booking, i) {
						if(booking.id == res.id) $store.bookings[i] = res
					})
					
					$location.path('/booking/' + $scope.booking.id)
				})
		} else {
			$scope.error = 'You need to assign a unit for every product.'
		}
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