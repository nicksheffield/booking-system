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
				prop: 'type.name',
				getter: x => x.type ? x.type.name : '',
				dropdown: {
					items: $store.product_types,
					display: { text: 'name' }
				}
			},
			{
				name: 'Number of units',
				prop: 'units.length',
				getter: x => x.units ? x.units.length : 0
			}
		]
	}
})