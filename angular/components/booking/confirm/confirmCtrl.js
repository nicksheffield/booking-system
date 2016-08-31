angular.module('app.controllers')

.controller('confirmCtrl', function($scope, $store, $location) {
	if(!$store.booking.pickup_at) {
		$location.path('/book')
	}
	
	$scope.user = $store.user
	
	$scope.booking = $store.booking
	
	$scope.products = $store.products
	
	console.log($scope.booking)
	
	$scope.product = (id) => _.find($scope.products, (p) => id == p.id)
	
	$scope.confirm = function() {
		console.log('confirmed!')
	}
})