angular.module('app.controllers')

.controller('classTypeNewCtrl', function($scope, $stateParams, $store, $location, Group_Type) {
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