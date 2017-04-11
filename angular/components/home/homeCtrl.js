angular.module('app.controllers')

.controller('homeCtrl', function($scope, $rootScope, $store, $stateParams, $prepare, User, Booking) {
	$scope.user = $store.user

	$scope.bookings = Booking.query({user: $scope.user.id})

	$scope.bookings.$promise.then($prepare.bookings)

})