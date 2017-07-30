angular.module('app.controllers')

.controller('kitManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.kits,
		buttons: ['view', 'edit'],
		slug: 'kit',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Number of Products',
				prop: 'products.length',
				getter: x => x.products ? x.products.length : 0
			}
		]
	}
})