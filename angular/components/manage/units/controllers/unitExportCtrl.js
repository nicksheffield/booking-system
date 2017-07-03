angular.module('app.controllers')

.controller('unitExportCtrl', function($scope, $http) {

	$http.get('/api/export/units').then(res => {
		$scope.csv = res.data
	})
	
})