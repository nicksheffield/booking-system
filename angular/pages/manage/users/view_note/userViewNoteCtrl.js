angular.module('app.controllers')

.controller('userViewNoteCtrl', function($scope, $stateParams, $store, $invalidate, $location, Note, sweetAlert) {

	$scope.user = _.clone($store.get('users', $stateParams.id))
	$scope.note = $store.get('notes', $stateParams.id2)

	$scope.notes = $store.notes

	$scope.dateify = function(str) {
		return new Date(str)
	}

	$scope.deleteNote = function(note) {
		sweetAlert.swal({
			text: 'Are you sure you want to delete this?',
			showCancelButton: true,
			type: 'warning'
		})
		.then(function() {
			Note.delete({id: note.id}).$promise.then(function() {
				$invalidate.add('notes')
				$location.path('/manage/user/' + $scope.user.id)
			})
		})
	}
})