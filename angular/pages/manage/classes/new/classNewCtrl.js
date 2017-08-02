angular.module('app.controllers')

.controller('classNewCtrl', function($scope, $stateParams, $store, $location, $invalidate, Group) {
	var type = $stateParams.type
	var code = $stateParams.code

	$scope.users  = $store.users
	$scope.types  = $store.group_types
	$scope.type   = null
	$scope.tutors = [null]
	$scope.staff  = $scope.users.filter(u => u.admin > 0)
	
	if(type) $scope.type = $store.get('group_types', {code: type})
	if(code) {
		$scope.code = code
		$store.group_types.forEach(gt => {
			if(code.indexOf(gt.code) !== -1) {
				$scope.type = gt
			}
		})
	}
	
	$scope.tutorRole = function(value, index, array) {
		return value.admin > 0
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
		var g = new Group()

		g.code = $scope.code
		g.group_type_id = $scope.type ? $scope.type.id : ''
		
		g.tutors = []
		
		_.forEach($scope.tutors, function(tutor) {
			if(tutor !== null && tutor.id) {
				g.tutors.push(tutor.id)
			}
		})

		g.$save().then(function(res) {
			$invalidate.add(['groups', 'users'])

			$location.path('/class')
		})
	}
})