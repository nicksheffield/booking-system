angular.module('app.controllers')

.controller('productTypeManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.product_types,
		buttons: ['view', 'edit'],
		slug: 'product-type',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Number of products',
				prop: x => x.products ? x.products.length : 0
			}
		]
	}
})