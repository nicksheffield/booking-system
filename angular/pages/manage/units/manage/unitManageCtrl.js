angular.module('app.controllers')

.controller('unitManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.units,
		buttons: ['view', 'edit'],
		slug: 'unit',
		orderBys: [
			x => x['product_id'],
			x => parseInt(x['Unit No.']),
		],
		additionalProps: [
			{
				name: 'product_id',
				prop: x => x.product ? x.product.id : ''
			}
		],
		cols: [
			{
				name: 'Product',
				prop: x => x.product ? x.product.name : '',
				filter: {
					type: 'dropdown2',
					items: $store.products,
					config: {
						text: 'name',
						id: 'name',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
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

})