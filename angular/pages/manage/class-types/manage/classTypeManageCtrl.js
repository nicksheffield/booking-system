angular.module('app.controllers')

.controller('classTypeManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.group_types,
		buttons: ['view', 'edit'],
		slug: 'class-type',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Code',
				prop: 'code'
			},
			{
				name: 'Number of classes',
				prop: 'groups.length',
				getter: x => x.groups ? x.groups.length : 0
			}
		]
	}
})