angular.module('app.controllers')

.controller('bookingsManageCtrl', function($scope, $store, $load, $merge, $stateParams, $http, $location, Booking, $prepare) {
	// $scope.bookings = $store.bookings
	$scope.units = $store.units
	$scope.current = parseInt($stateParams.page) || 1
	$scope.perPage = 10
	$scope.total = 350

	$scope.bookings = Booking.query({limit: $scope.perPage, offset: $scope.perPage * ($scope.current - 1)})
	$scope.bookings.$promise.then($prepare.bookings)


	$scope.showClosed = false

	$scope.showClosed = localStorage.getItem('showClosed') == 'true' || false

	$http.get('/api/booking/count').then(function(response) {
		$scope.total = response.data.total
		console.log($scope.total)
	})

	$scope.gotoPage = function(page) {
		
	}

	$scope.toggleClosed = function() {
		localStorage.setItem('showClosed', $scope.showClosed)
	}

	$scope.dateOptions = {
		showWeeks: false,
		format: 'd MMM yyyy',
	}
	
	$scope.openAfterDate = function() {
		$scope.openAfterDateControl = $scope.openAfterDateControl ? false : true
		$scope.filterUseAfterDate = true
	}
	
	$scope.openBeforeDate = function() {
		$scope.openBeforeDateControl = $scope.openBeforeDateControl ? false : true
		$scope.filterUseBeforeDate = true
	}

	$scope.afterDate = ''
	$scope.beforeDate = ''

	$scope.search = function() {
		// $load.bookings({after: $scope.date}).$promise.then(function(newBookings) {
		// 	$merge.bookings(newBookings)
		// })

		$scope.bookings = $store.bookings = $load.bookings({after: $scope.afterDate, before: $scope.beforeDate})
	}

	if($stateParams.user) $scope.filteredUser = $store.get('users', $stateParams.user)
	if($stateParams.group) $scope.filteredGroup = $store.get('groups', {code: $stateParams.group})
	
	$scope.userFilter = value => !$stateParams.user || value.user && value.user.id == $scope.filteredUser.id
	$scope.groupFilter = value => !$stateParams.group || value.user.group && value.user.group.id == $scope.filteredGroup.id

	$scope.group = id => _.find($store.groups, {id: id})

	$scope.showClosedFilter = function(value, index, array) {
		if(!$scope.showClosed && value.closed_at) {
			return false
		} else {
			return true
		}
	}
})