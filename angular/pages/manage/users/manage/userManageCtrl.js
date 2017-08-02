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
					type: 'dropdown2',
					items: [
						{ name: 'Manager' },
						{ name: 'Staff' },
						{ name: 'Student' },
					],
					config: {
						text: 'name',
						id: 'name',
						multiple: true,
						placeholder: 'Search...',
						small: true,
						clearable: true,
						disableOnEmpty: true
					}
				}
			},
			{
				name: 'Class',
				prop: 'group.code',
				getter: x => x.group ? x.group.code : '',
				filter: {
					type: 'dropdown2',
					items: $store.groups,
					config: {
						text: 'code',
						id: 'code',
						multiple: true,
						placeholder: 'Search...',
						small: true,
						clearable: true,
						disableOnEmpty: true
					}
				}
			},
		]
	}
})