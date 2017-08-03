angular.module('app.controllers')

.controller('classTypeViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, sweetAlert) {
	$scope.type = $store.get('group_types', $stateParams.id)
	
	window.$scope = $scope
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.type.$delete().then(function() {
				$invalidate.add('group_types')
				
				$location.path('/class-type')
			})
		})
	}

	$scope.classesDataTable = {
		items: $scope.type.groups,
		buttons: ['view', 'edit'],
		slug: 'class',
		cols: [
			{
				name: 'Code',
				prop: 'code'
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
				name: 'Number of Students',
				prop: x => x.users ? x.users.length : 0
			},
		]
	}

	$scope.productsDataTable = {
		items: $scope.type.products,
		buttons: ['view', 'edit'],
		slug: 'product',
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Quantity',
				prop: x => x.limitless ? 'N/A' : parseInt(x.pivot.quantity)
			},
			{
				name: 'Days',
				prop: x => parseInt(x.pivot.days_allowed)
			},
		]
	}
})