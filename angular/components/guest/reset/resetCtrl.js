angular.module('app.controllers')

.controller('resetCtrl', function($scope, $http) {

	$scope.submit = function() {
		$http
			.post('/password/email', {
				email: $scope.email
			})
			.then(function(res) {
				var data = res.data

				console.log(data)
			})
	}
})