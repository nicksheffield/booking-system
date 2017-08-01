angular.module('app.controllers')

.controller('userManageCtrl', function($scope, $store, $location) {
	$scope.dataTable = {
		items: $store.users,
		buttons: ['view', 'edit'],
		slug: 'user',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Role',
				prop: '_role',
				filter: {
					type: 'dropdown',
					items: [
						{ name: 'Manager' },
						{ name: 'Staff' },
						{ name: 'Student' },
					],
					display: { text: 'name' }
				}
			},
			{
				name: 'Class',
				prop: 'group.code',
				getter: x => x.group ? x.group.code : '',
				filter: {
					type: 'dropdown',
					items: $store.groups,
					display: { text: 'code' }
				}
			},
		]
	}
})