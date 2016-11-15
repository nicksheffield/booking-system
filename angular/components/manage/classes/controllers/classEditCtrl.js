angular.module('app.controllers')

.controller('classEditCtrl', function($scope, $stateParams, $store, $location, $invalidate, Group) {
	$scope.group = $store.get('groups', $stateParams.id)
	$scope.users = $store.users
	
	$scope.types = $store.group_types
	$scope.selected = {
		type: $store.get('group_types', $scope.group.type.id),
		tutors: $scope.group.tutors
	}
	
	$scope.tutorRole = function(value, index, array) {
		return value.admin > 0
	}
	
	$scope.addTutor = function() {
		$scope.selected.tutors.push({})
	}
	
	$scope.removeTutor = function(tutor) {
		$scope.selected.tutors = _.reject($scope.selected.tutors, (t) => t.id == tutor.id)
		
		if(!$scope.selected.tutors.length) {
			$scope.addTutor()
		}
	}
	
	$scope.save = function() {
		$scope.group.group_type_id = $scope.selected.type.id
		$scope.group.tutors = []
		
		_.forEach($scope.selected.tutors, function(tutor) {
			if(tutor.id) {
				$scope.group.tutors.push(tutor.id)
			}
		})
		
		Group.update({id: $scope.group.id}, $scope.group).$promise.then(function(res) {
			$invalidate.add(['groups', 'users'])
			
			$location.path('/manage/class/' + $scope.group.id)
		})
	}
})