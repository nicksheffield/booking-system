angular.module('app.controllers')

.controller('unitImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, Unit) {
	window.$scope = $scope

	$scope.units = []
	$scope.errors = []
	$scope.loader = {}
	$scope.reloading = false

	function getValue(cols, line, col) {
		var index = _.indexOf(cols, col)

		console.log(col, index)

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

		$scope.units = []

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
			} else {
				unit._noproduct = row.product_name
			}

			$scope.units.push(unit)
		})
		
	}

	$scope.import = function() {
		if(!$scope.units.length) return

		if($scope.errors.length) {
			if(!confirm('There ' + ($scope.errors.length == 1 ? 'is an unresolved issue' : 'are ' + $scope.errors.length + ' unresolved issues') + '. Are you sure you want to import?')) {
				return
			}
		} else {
			if(!confirm('Are you sure you want to import ' + ($scope.units.filter(u => u._add).length == 1 ? ' this unit?' : 'these ' + $scope.units.filter(u => u._add).length + ' units?'))) {
				return
			}
		}

		var promises = $scope.units
			.filter(u => u._add)
			.map(u => u.$save().$promise)

		$q.all(promises).then(function(values) {
			$invalidate.add('units')
			$location.path('/manage/unit')
		})
	}

	$scope.checkedUnits = function() {
		return $scope.units.filter(u => u._add)
	}
	
})