angular.module('app.controllers')

.controller('classTypeEditCtrl', function($scope, $stateParams, $store) {
	$store.group_types.$promise.then(function() {
		$scope.type = _.find($store.group_types, function(type) {
			return type.id == $stateParams.id
		})
	})
})