angular.module('app.controllers')

.controller('resetCtrl', function($scope, $http) {

	$scope.submit = function() {
		$http
			.post('/password/email', {
				email: $scope.email
			})
			.then(function(res) {
				$scope.message = 'Password Reset email sent. Please check your inbox.'
			})
	}
})