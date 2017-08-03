angular.module('app.controllers')

.controller('productManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.products,
		buttons: ['view', 'edit'],
		slug: 'product',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Type',
				prop: x => x.type ? x.type.name : '',
				filter: {
					type: 'dropdown2',
					items: $store.product_types,
					config: {
						text: 'name',
						id: 'id',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
			{
				name: 'Number of units',
				prop: x => x.units ? x.units.length : 0
			}
		]
	}
})