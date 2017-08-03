angular.module('app.controllers')

.controller('classViewCtrl', function($scope, $stateParams, $store, $location, $invalidate, $q, Group, User, sweetAlert) {
	$scope.group = $store.get('groups', $stateParams.id)
	
	$scope.delete = function() {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.group.$delete().then(function() {
				$invalidate.add('groups')

				$location.path('/class')
			})
		})
	}

	$scope.retire = function() {
		sweetAlert.swal({
			text: 'This will set this class as inactive, as well as all students in this class',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			var promises = []
			$scope.loading = true

			$scope.group.active = false
			var groupPromise = Group.update({id: $scope.group.id}, $scope.group).$promise

			$scope.group.users.forEach(u => {
				u.active = false
				var userPromise = User.update({id: u.id}, u).$promise

				promises.push(userPromise)
			})

			promises.push(groupPromise)
			
			$q.all(promises)
				.then(function(res) {
					$invalidate.add('users', 'groups', 'group_types')
					$location.path('/class')
				})
		})
		
	}

	$scope.reactivate = function() {
		sweetAlert.swal({
			text: 'This will set this class as active, as well as all students in this class',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			var promises = []
			$scope.loading = true

			$scope.group.active = true
			var groupPromise = Group.update({id: $scope.group.id}, $scope.group).$promise

			$scope.group.users.forEach(u => {
				u.active = true
				var userPromise = User.update({id: u.id}, u).$promise
				
				promises.push(userPromise)
			})

			promises.push(groupPromise)
			
			$q.all(promises)
				.then(function(res) {
					$invalidate.add('users', 'groups', 'group_types')
					$location.path('/class')
				})
		})
	}

	$scope.dataTable = {
		items: $scope.group.users,
		buttons: ['view', 'edit'],
		slug: 'user',
		cols: [
			{
				name: 'ID Number',
				prop: 'id_number'
			},
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Email',
				prop: 'email'
			},
			{
				name: 'Phone',
				prop: 'phone'
			},
			{
				name: 'DOB',
				prop: x => {
					return x.dob ? moment(x.dob).format('YYYY-MM-DD') + (
						isNaN(x._age) ? '' : ' (' + parseInt(x._age) + ')'
					) : ''
				}
			},
			{
				name: 'Can Book',
				prop: x => x.can_book ? 'Yes' : 'No'
			}
		]
	}
})