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
				prop: 'type.code',
				getter: x => x.type ? x.type.code : '',
				dropdown: {
					items: $store.group_types,
					display: { text: 'code' }
				}
			},
			{
				name: 'Tutors',
				prop: 'tutors',
				getter: x => x.tutors ? x.tutors.reduce((s,t) => {
					s.push(t.name)
					return s
				}, []).join(', ') : '',
				dropdown: {
					items: $store.users.filter(u => u.admin).sort(u => u.name),
					display: { text: 'name' }
				}
			},
			{
				name: 'Number of students',
				prop: 'users.length',
				getter: x => x.users ? x.users.length : 0
			}
		]
	}
})