angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'mainCtrl',
			data: {
				requireLogin: false
			}
		});
});