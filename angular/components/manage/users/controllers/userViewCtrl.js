angular.module('app.controllers')

.controller('userViewCtrl', function($scope, $stateParams, $store, $invalidate, $location, Note, User, sweetAlert) {
	$scope.user = $store.get('users', $stateParams.id)
	$scope.you = $store.user
	
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
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			$scope.user.$delete().then(function() {
				$invalidate.add(['users', 'groups', 'bookings'])
				
				$location.path('/manage/user')
			})
		})
	}

	$scope.deleteNote = function(note) {
		sweetAlert.swal({
			text: 'Are you sure you want to delete that note?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			Note.delete({id: note.id}).$promise.then(function() {
				$store.notes = _.reject($scope.user.notes, (n) => n.id == note.id)
			})
		})
	}
})