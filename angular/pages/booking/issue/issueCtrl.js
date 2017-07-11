angular.module('app.controllers')
	
.controller('issueCtrl', function($scope, $stateParams, $store, $location, $http, $invalidate, $load, $prepare, $timeout, sweetAlert) {
	window.$scope = $scope

	$scope.booking = $store.get('bookings', $stateParams.id)
	$scope.allProducts = $store.products
	$scope.errors = []
	$scope.products = []

	$scope.unit_number = u => parseInt(u.unit_number)

	if(!$scope.booking) {
		$scope.booking = $load.booking($stateParams.id)
	}

	$scope.booking.$promise.then(b => {
		$scope.products = b._products.map($scope.setupUnits)
	}, function(err) {
		$scope.errors.push({message: err.data.error})
	})

	$scope.setupUnits = function(p) {
		if(p.units) {
			p._units = p.units.map(u => ({id: u.id, unit_number: u.unit_number}))
		} else {
			p._units = $store.units
				.filter(u => u.product_id === p.id)
				.map(u => ({id: u.id, unit_number: u.unit_number}))
		}
		
		return _.clone(p)
	}

	$scope.setupAllUnits = function() {
		$timeout(() => $scope.products = $scope.products.map($scope.setupUnits))
	}

	$scope.addProduct = function() {
		$scope.products.push(null)
	}

	$scope.removeProduct = function(product, index) {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.products.splice(index, 1)

			if(!$scope.products.length) $scope.products.push(null)

			$scope.$apply()
		})
	}

	$scope.issue = function() {
		let allChosen = true

		$scope.products.forEach(p => {
			if(!p) return
			if(!p._unit && !p._taken) allChosen = false
		})
		
		if(allChosen) {
			$scope.booking.taken_at = new Date()
			$scope.booking.issued_by_id = $store.user.id

			$scope.booking.products = $scope.products

			$scope.booking._req_type = 'issue'

			$http
				.put('/api/booking/' + $scope.booking.id, $scope.booking)
				.then(function(res) {
					// console.log('res', res)
					// return
					
					$location.path('/bookings')
				})
		} else {
			if(_.findIndex($scope.errors, {code: 1}) === -1) {
				$scope.errors.push({code: 1, message: 'You need to assign a unit for every product.'})
			}
		}
	}

})