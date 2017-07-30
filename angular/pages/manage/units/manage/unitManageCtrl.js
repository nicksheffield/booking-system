angular.module('app.controllers')

.controller('unitManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.units,
		buttons: ['view', 'edit'],
		slug: 'unit',
		orderBys: [
			u => u.product_id,
			u => parseInt(u.unit_number)
		],
		cols: [
			{
				name: 'Product',
				prop: 'product.name',
				getter: x => x.product ? x.product.name : '',
				dropdown: {
					items: $store.products,
					display: { text: 'name' }
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