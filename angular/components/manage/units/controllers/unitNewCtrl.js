angular.module('app.controllers')

.controller('unitNewCtrl', function($scope, $stateParams, $store, $location, $flash, Unit) {
	$scope.products = $store.products
	
	$scope.product_id = $flash.use('product')

	$scope.save = function() {
		var u = new Unit()

		u.serial_number = $scope.serial_number
		u.asset_number = $scope.asset_number
		u.unit_number = $scope.unit_number
		u.product_id = $scope.product_id
		u.notes = $scope.notes

		u.$save().then(function(res) {
			$store.invalidate(['units', 'products'])

			$location.path('/manage/unit')
		})
	}
})