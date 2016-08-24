angular.module('app.controllers')

.controller('classTypeNew', function($scope, $stateParams, $store, $location, Group_Type) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, function(type) {
			return type.id == $stateParams.id
		})
	})

	$scope.save = function() {
		var gt = new Group_Type();

		gt.code = $scope.code
		gt.name = $scope.name

		gt.$save().then(function(res) {
			$store.loadGroupTypes()

			$location.path('/manage/class_types')
		})
	}
})