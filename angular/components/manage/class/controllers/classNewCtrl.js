angular.module('app.controllers')

.controller('classNewCtrl', function($scope, $stateParams, $store, $location, Group) {
	$store.loadGroupTypes()
	$scope.types = $store.group_types

	$scope.save = function() {
		var g = new Group()

		g.code = $scope.code
		g.group_type_id = $scope.type_id

		g.$save().then(function(res) {
			$store.loadGroups()

			$location.path('/manage/classes')
		})
	}
})