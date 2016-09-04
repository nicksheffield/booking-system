angular.module('app.controllers')

.controller('classNewCtrl', function($scope, $stateParams, $store, $location, $flash, Group) {
	var type = $stateParams.type

	$scope.users = $store.users
	$scope.types = $store.group_types
	$scope.selected = {
		type: {},
		tutors: [{}]
	}
	
	if(type) {
		$scope.selected.type = $store.get('group_types', {code: type})
		console.log($scope.selected.type)
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
		var g = new Group()

		g.code = $scope.code
		g.group_type_id = $scope.selected.type.id
		
		g.tutors = []
		
		_.forEach($scope.selected.tutors, function(tutor) {
			if(tutor.id) {
				g.tutors.push(tutor.id)
			}
		})

		g.$save().then(function(res) {
			$store.invalidate(['groups', 'group_types', 'users'])

			$location.path('/manage/class')
		})
	}
})