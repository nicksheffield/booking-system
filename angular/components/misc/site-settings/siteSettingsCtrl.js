angular.module('app.controllers')

.controller('siteSettingsCtrl', function($scope, $store, $q, Setting) {
	$scope.settings = $store.settings
	$scope.thinking = false
	$scope.saved = false

	$scope.$watch('settings', function(newVal) {
		$scope.saved = false
	}, true)

	$scope.save = function() {
		var promises = []
		$scope.thinking = true

		$scope.settings.forEach(function(setting) {
			var promise = Setting.update({id: setting.id}, setting).$promise
				
			promise.then(function(res) {
				console.log(res)
			})

			promises.push(promise)
		})

		$q.all(promises).then(function() {
			$scope.thinking = false
			$scope.saved = true
			console.log('all saved')
		})
	}
})