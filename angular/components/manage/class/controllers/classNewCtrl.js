angular.module('app.controllers')

.controller('classTypeNewCtrl', function($scope, $stateParams, $store, $location, Group) {
	$store.groups.$promise.then(function() {
		$scope.group = _.find($store.groups, function(group) {
			return group.id == $stateParams.id
		})
	})

	$scope.save = function() {
		var g = new Group()

		g.code = $scope.code
		g.type_id = $scope.type_id

		g.$save().then(function(res) {
			$store.loadGroups()

			$location.path('/manage/classes')
		})
	}
})