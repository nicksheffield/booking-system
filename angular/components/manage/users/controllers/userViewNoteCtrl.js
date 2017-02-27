angular.module('app.controllers')

.controller('userViewNoteCtrl', function($scope, $stateParams, $store, $invalidate, $location, Note) {

	$scope.user = _.clone($store.get('users', $stateParams.id))
	// $scope.note = _.find($scope.user.notes, (note) => note.id == $stateParams.id2)
	$scope.note = $store.get('notes', $stateParams.id2)

	$scope.notes = $store.notes

	window.scope = $scope

	$scope.deleteNote = function(note) {
		if(confirm('Are you sure you want to delete that note?')) {
			Note.delete({id: note.id}).$promise.then(function() {
				$scope.user.notes = _.reject($scope.user.notes, (n) => n.id == note.id)
			})
		}
	}
})