angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'homeCtrl',
			data: {conditions: ['auth']}
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'registerCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})
		.state('logout', {
			url: '/logout',
			controller: function($auth, $state, $store) {
				$auth.logout().then(function() {
					$state.go('login')
					$store.user = {}
				})
			}
		})
		.state('profile', {
			url: '/profile/:username',
			templateUrl: 'views/profile.html',
			controller: 'profileCtrl',
			data: {conditions: ['auth']}
		})
})