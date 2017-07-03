angular.module('app.controllers')

.controller('userExportCtrl', function($scope, $http) {

	$http.get('/api/export/users').then(res => {
		$scope.csv = res.data
	})
	
})