angular.module('app.controllers')

.controller('userManageCtrl', function($scope, $store, $location) {
	$scope.users = $store.users

	$scope.dropdownObj = {
		items: $store.groups,
		display: { text: 'code' }
	}

	$scope.dataTable = {
		items: $scope.users,
		buttons: ['view', 'edit'],
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Role',
				prop: '_role',
				dropdown: {
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
				prop: 'group.code', getter: x => x.group ? x.group.code : '',
				dropdown: {
					items: $store.groups,
					display: { text: 'code' }
				}
			},
		]
	}
})