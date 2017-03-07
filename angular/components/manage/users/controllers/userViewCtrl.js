angular.module('app.controllers')

.controller('userViewCtrl', function($scope, $stateParams, $store, $invalidate, $location, Note, User) {
	$scope.user = $store.get('users', $stateParams.id)
	
	if($scope.user.admin == 1 && $scope.user.group && !$scope.user.group._isTutor($store.user.id)) {
		$location.path('/manage/user')
	}

	$scope.filterOutRevisions = function(note) {
		var isOld = false

		_.forEach($scope.user.notes, function(n) {
			if(note.id == n.revision_of) isOld = true
		})

		return isOld
	}
	
	$scope.delete = function() {
		var confirmed = confirm('Are you sure you want to delete this?')
		
		if(confirmed) {
			$scope.user.$delete().then(function() {
				$invalidate.add(['users', 'groups', 'bookings'])
				
				$location.path('/manage/user')
			})
		}
	}

	$scope.deleteNote = function(note) {
		if(confirm('Are you sure you want to delete that note?')) {
			Note.delete({id: note.id}).$promise.then(function() {
				$scope.user.notes = _.reject($scope.user.notes, (n) => n.id == note.id)
			})
		}
	}
})