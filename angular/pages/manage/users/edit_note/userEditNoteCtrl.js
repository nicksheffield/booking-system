angular.module('app.controllers')

.controller('userEditNoteCtrl', function($scope, $stateParams, $store, $location, $invalidate, Note) {
	
	$scope.user = _.clone($store.get('users', $stateParams.id))
	// $scope.note = _.find($scope.user.notes, (note) => note.id == $stateParams.id2)
	$scope.note = $store.get('notes', $stateParams.id2)

	if(!$scope.note) $location.path('/user/' + $scope.user.id)
	
	$scope.save = function() {
		Note.update({id: $scope.note.id}, $scope.note).$promise.then(function() {
			$invalidate.add('notes')
			
			$location.path('/user/' + $scope.user.id)
		})
	}
	
})