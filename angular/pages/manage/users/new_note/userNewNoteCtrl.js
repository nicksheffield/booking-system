angular.module('app.controllers')

.controller('userNewNoteCtrl', function($scope, $stateParams, $store, $location, $invalidate, User, Note) {

	$scope.content = ''
	$scope.user = _.clone($store.get('users', $stateParams.id))

	$scope.save = function() {
		var n = new Note()
		
		n.content = $scope.content
		n.user_id = $scope.user.id
		
		n.$save().then(function(res) {
			$invalidate.add('notes')
			
			$location.path('/user/' + $scope.user.id)
		}).catch(function(res) {
			console.log('save err', res)
		})
	}
})