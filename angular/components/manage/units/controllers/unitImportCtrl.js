angular.module('app.controllers')

.controller('unitImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, Unit) {

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
	
	$scope.loader.loaded = function(file) {
		if(file) {
			$scope.units = []
			$scope.errors = []

			var csv = $csv(file)

			var fields = {
				'product_name'  : 'product_name',
				'unit_number'   : 'unit_number',
				'serial_number' : 'serial_number',
				'asset_number'  : 'asset_number'
			}

			var cols = csv.shift()

			cols = cols.map(col => fields[col] ? fields[col] : col)

			csv.forEach(line => {
				var newUnit = new Unit()

				line.forEach((val, i) => {
					var col = cols[i]

					if(col == 'product_name') {
						var product = $store.get('products', {name: val})
						
						if(product) {
							newUnit._product = product
							newUnit.product_id = newUnit._product.id
						} else {
							newUnit._noproduct = val
							var error = _.find($scope.errors, {message: 'Product "' + val + '" not found'})

							if(!error) {
								$scope.errors.push({message: 'Product "' + val + '" not found', count: 1, type: 'product', product_name: val})
							} else {
								error.count++
							}
						}
					} else {
						newUnit[col] = val
					}
				})

				newUnit._add = true

				$scope.units.push(newUnit)
			})
		}
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