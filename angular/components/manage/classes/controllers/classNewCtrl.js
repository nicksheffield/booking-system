angular.module('app.controllers')

.controller('classNewCtrl', function($scope, $stateParams, $store, $location, $flash, Group) {
	$scope.types = $store.group_types
	
	$scope.type_id = $flash.use('class_type')

	$scope.save = function() {
		var g = new Group()

		g.code = $scope.code
		g.group_type_id = $scope.type_id

		g.$save().then(function(res) {
			$store.invalidate('groups')

			$location.path('/manage/class')
		})
	}
})