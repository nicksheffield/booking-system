angular.module('app.controllers')

.controller('editBookingCtrl', function ($scope, $stateParams, $store, $location, $http, $invalidate, $load, $prepare, $timeout, sweetAlert) {
	$scope.booking = $load.booking($stateParams.id)
	$scope.allProducts = $store.products
	$scope.errors = []
	$scope.products = []
	$scope.status = ''

	$scope.unit_number = u => parseInt(u.unit_number)

	$scope.booking.$promise.then(b => {
		$scope.products = b._products
			.map($scope.setupUnits)
			.map($scope.setupUnit)
			.map($scope.keepPivotID)

		$scope.status = $scope.booking._status
	}, function (err) {
		$scope.errors.push({ message: err.data.error })
	})

	$scope.keepPivotID = function(p, i) {
		p.pivot = {
			id: $scope.booking.products[i].pivot.id
		}

		return p
	}

	$scope.setupUnit = function(p, i) {
		if ($scope.booking.products[i].pivot) {
			p._unit = p._units.filter(u => u.id == $scope.booking.products[i].pivot.unit_id)[0]
		}
		
		return p
	}

	$scope.setupUnits = function (p) {
		if (p.units) {
			p._units = p.units.map(u => ({ id: u.id, unit_number: u.unit_number }))
		} else {
			p._units = $store.units
				.filter(u => u.product_id === p.id)
				.map(u => ({ id: u.id, unit_number: u.unit_number }))
		}

		return _.clone(p)
	}

	$scope.setupAllUnits = function () {
		$timeout(() => $scope.products = $scope.products.map($scope.setupUnits))
	}

	$scope.addProduct = function () {
		$scope.products.push(null)
	}

	$scope.removeProduct = function (product, index) {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
			.then(function () {
				$scope.products.splice(index, 1)

				if (!$scope.products.length) $scope.products.push(null)

				$scope.$apply()
			})
	}

	$scope.save = function () {
		if($scope.booking._priority == 1) $scope.saveBooked()
		if($scope.booking._priority == 2) $scope.saveIssued()
	}

	$scope.saveBooked = function() {
		$scope.booking._req_type = 'edit_booked'

		$scope.booking.products = $scope.products

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function (res) {
				$location.path('/booking/' + $scope.booking.id)
			})
	}

	$scope.saveIssued = function() {
		$scope.booking.taken_at = new Date()
		$scope.booking.issued_by_id = $store.user.id

		$scope.booking.products = $scope.products

		$scope.booking._req_type = 'edit_issued'

		$http
			.put('/api/booking/' + $scope.booking.id, $scope.booking)
			.then(function (res) {
				$location.path('/booking/' + $scope.booking.id)
			})
	}

})