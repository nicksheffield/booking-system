angular.module('app.controllers')

.controller('productViewCtrl', function($scope, $stateParams, $state, $store, $location, $invalidate, sweetAlert) {
	$scope.product = $store.get('products', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.product.$delete().then(function() {
				$invalidate.add(['products', 'product_types', 'units'])
				
				$location.path('/product')
			})
		})
	}

	$scope.unitsDataTable = {
		items: $scope.product.units,
		buttons: ['view', 'edit'],
		slug: 'unit',
		orderBys: [
			x => parseInt(x['Unit No.']),
		],
		cols: [
			{
				name: 'Unit No.',
				prop: 'unit_number'
			},
			{
				name: 'Serial No.',
				prop: 'serial_number'
			},
			{
				name: 'Asset No.',
				prop: 'asset_number'
			}
		]
	}

	$scope.classTypesDataTable = {
		items: $scope.product.group_types,
		buttons: ['view', 'edit'],
		slug: 'class_type',
		cols: [
			{
				name: 'Code',
				prop: 'code',
				filter: {
					type: 'dropdown2',
					items: $store.group_types,
					config: {
						text: 'code',
						id: 'id',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Quantity allowed',
				prop: x => $scope.product.limitless ? 'N/A' : x.pivot.quantity
			},
			{
				name: 'Days allowed',
				prop: x => x.pivot.days_allowed
			},
		]
	}
	
	$scope.kitsDataTable = {
		items: $scope.product.kits,
		buttons: ['view', 'edit'],
		slug: 'kit',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Quantity',
				prop: x => $scope.product.limitless ? 'N/A' : x.pivot.quantity
			}
		]
	}
})