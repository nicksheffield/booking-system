angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Group) {
	$scope.group   = _.clone($store.get('groups', $stateParams.id))
	$scope.users   = $store.users
	$scope.types   = $store.group_types
	$scope.type    = $scope.group.type ? $store.get('group_types', $scope.group.type.id) : null
	$scope.tutors  = $scope.group.tutors.length ? $scope.group.tutors : [null]
	$scope.staff   = $scope.users.filter(u => u.admin > 0)

	if($scope.groups) {
		$scope.groups = $scope.groups.map((g) => {
			g._code_name = g.code + ' - ' + g.name
			return g
		})
	}
	
	$scope.addTutor = function() {
		$scope.tutors.push(null)
	}

	$scope.removeTutor = function(index) {
		$scope.tutors.splice(index, 1)
		
		if(!$scope.tutors.length) {
			$scope.addTutor()
		}
	}
	
	$scope.save = function() {
		$scope.group.group_type_id = $scope.group.type ? $scope.group.type.id : ''
		$scope.group.tutors = []
		
		_.forEach($scope.tutors, function(tutor) {
			if(tutor !== null && tutor.id) {
				$scope.group.tutors.push({id: tutor.id})
			}
		})
		
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$invalidate.add(['groups', 'users'])
			
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})