angular.module('app.controllers')

.controller('classTypeNewCtrl', function($scope, $stateParams, $store, $location, Group_Type) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, (t) => t.id == $stateParams.id)
	})

	$scope.save = function() {
		var gt = new Group_Type();

		gt.code = $scope.code
		gt.name = $scope.name

		gt.$save().then(function(res) {
			$store.invalidate('group_types')
			
			$location.path('/manage/class_type')
		})
	}
})