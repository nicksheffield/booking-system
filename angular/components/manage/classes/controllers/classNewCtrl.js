angular.module('app.controllers')

.controller('classNewCtrl', function($scope, $stateParams, $store, $location, $flash, Group) {
	var type_id = $flash.use('class_type')
	
	$scope.selected = { type: {} }
	$scope.types = $store.group_types
	
	if(type_id) {
		$scope.selected.type = $store.get('group_types', type_id)
	}

	$scope.save = function() {
		var g = new Group()

		g.code = $scope.code
		g.group_type_id = $scope.selected.type.id

		g.$save().then(function(res) {
			$store.invalidate(['groups', 'group_types', 'users'])

			$location.path('/manage/class')
		})
	}
})