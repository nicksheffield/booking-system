angular.module('app.controllers')

.controller('classManageCtrl', function($scope, $store) {
	$scope.dataTable = {
		items: $store.groups,
		buttons: ['view', 'edit'],
		slug: 'class',
		cols: [
			{
				name: 'Code',
				prop: 'code'
			},
			{
				name: 'Type',
				prop: x => x.type ? x.type.code : '',
				filter: {
					type: 'dropdown2',
					items: $store.group_types,
					config: {
						text: 'code',
						id: 'id',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
			{
				name: 'Tutors',
				prop: x => x.tutors ? x.tutors.reduce((s,t) => {
					s.push(t.name)
					return s
				}, []).join(', ') : '',
				filter: {
					type: 'dropdown2',
					items: $store.users.filter(u => u.admin).sort(u => u.name),
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
				name: 'Number of students',
				prop: x => x.users ? x.users.length : 0
			}
		]
	}
})