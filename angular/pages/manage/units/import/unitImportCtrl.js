angular.module('app.controllers')

.controller('unitImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, $xlsx, sweetAlert, Unit) {

	$scope.units = []
	$scope.errors = []
	$scope.skips = []
	$scope.loader = {}
	$scope.reloading = false

	function getValue(cols, line, col) {
		var index = _.indexOf(cols, col)

		return line[index]
	}

	$scope.reload = function() {
		$scope.reloading = true
		$invalidate.add('products')

		$q.all($invalidate.load()).then(function() {
			if($scope.loader.load) $scope.loader.load()
			$scope.reloading = false
		})
	}

	$scope.encode = s => encodeURIComponent(s)

	$scope.$watch('units', function(newVal, oldVal) {
		$scope.calculateErrors()
	}, true)

	$scope.calculateErrors = function() {
		var errors = []

		$scope.units
			.filter(u => u._add)
			.forEach(unit => {
				if(unit._noproduct) {
					var error = _.find(errors, {message: 'Product "' + unit._noproduct + '" not found'})

					if(!error) {
						errors.push({message: 'Product "' + unit._noproduct + '" not found', count: 1, type: 'product', product_name: unit._noproduct})
					} else {
						error.count++
					}
				}
			})

		$scope.errors = errors
	}

	$scope.loader.loaded = function(file, type) {
		var data
		
		if(file && type == 'csv') {
			data = $csv.parse(file)
		} else if(file && type == 'xlsx') {
			data = $xlsx.parse(file)
		}

		// remove blank lines
		data = data.filter(r => r.unit_number !== '')

		$scope.units = []
		$scope.skips = []

		data.forEach(row => {
			var unit = new Unit()

			// standard stuff
			unit.unit_number   = row.unit_number
			unit.serial_number = row.serial_number
			unit.asset_number  = row.asset_number
			unit._add          = true

			// product stuff
			var product = $store.get('products', {name: row.product_name})

			if(product) {
				unit._product = product
				unit.product_id = unit._product.id

				var unitExists = product.units.find(u => {
					return 	u.unit_number == unit.unit_number ||
							u.serial_number == unit.serial_number ||
							u.asset_number == unit.asset_number
				})

				if(unitExists) {

					$scope.skips.push(unit)

					return
				}
			} else {
				unit._noproduct = row.product_name
			}

			$scope.units.push(unit)
		})
		
	}

	$scope.import = function() {
		if(!$scope.units.length) return

		if($scope.errors.length) {
			sweetAlert.swal({
				titleText: 'Unresolved Issues',
				html: 'Do you still want to import all these units?',
				showCancelButton: true,
				cancelButtonText: "I'll fix the issues",
				confirmButtonText: "Yeah it's fine"
			})
			.then(go)
		} else {
			sweetAlert.swal({
				titleText: 'Good to go',
				html: 'You are about to import <b>' + ($scope.units.filter(u => u._add).length) + '</b> ' + ($scope.units.filter(u => u._add).length == 1 ? ' unit' : ' units'),
				showCancelButton: true,
				cancelButtonText: "Not yet",
				confirmButtonText: "Sweet let's do it"
			})
			.then(go)
		}

		function go() {
			var promises = $scope.units
				.filter(u => u._add)
				.map(u => u.$save().$promise)

			$q.all(promises).then(function(values) {
				$invalidate.add('units')
				$location.path('/manage/unit')
			})
		}
	}

	$scope.checkedUnits = function() {
		return $scope.units.filter(u => u._add)
	}
	
})