angular.module('app.controllers')

.controller('unitEditCtrl', function($scope, $stateParams, $store, $location, Unit) {
	$scope.products = $store.products
	
	$scope.unit = $store.get('units', $stateParams.id)
	
	$scope.save = function() {
		Unit.update({id: $scope.unit.id}, $scope.unit).$promise.then(function(res) {
			$store.invalidate(['units', 'products'])
			
			$location.path('/manage/unit/' + $scope.unit.id)
		})
	}
})