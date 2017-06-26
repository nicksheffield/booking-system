angular.module('app.controllers')

.controller('issueCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, $load, $prepare) {
	
	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.errors = []
	$scope.allUnits = []

	window.$scope = $scope

	if(!$scope.booking) {
		$scope.booking = $load.booking($stateParams.id)
	}
	
	$scope.booking.$promise.then(b => {

		// this is all to solve some weird issue with the dropdown and the units array
		b._products.forEach(p => {
			var arr = []

			p.units.forEach(u => {
				arr.push({
					id: u.id,
					unit_number: u.unit_number
				})
			})

			$scope.allUnits.push(arr)
		})

	}, function(err) {
		$scope.errors.push({message: err.data.error})
	})

	$scope.issue = function() {
		let allChosen = true

		$scope.booking._products.forEach(p => {
			if(!p._unit && !p._taken) allChosen = false
		})
		
		if(allChosen) {
			$scope.booking.taken_at = new Date()
			$scope.booking.issued_by_id = $store.user.id

			$scope.booking.products.forEach((p, i) => {
				// if($scope.booking._products[i]._unit) p.unit = $scope.units[i]
			})

			console.log($scope.booking); return
			
			$http
				.put('/api/booking/' + $scope.booking.id, $scope.booking)
				.then(function(res) {
					$store.bookings = _.map($store.bookings, function(booking, i) {
						if(booking.id == res.id) $store.bookings[i] = res
					})
					
					$location.path('/booking/' + $scope.booking.id)
				})
		} else {
			if(_.findIndex($scope.errors, {code: 1}) === -1) {
				$scope.errors.push({code: 1, message: 'You need to assign a unit for every product.'})
			}
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