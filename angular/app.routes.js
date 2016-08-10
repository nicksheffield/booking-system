angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'mainCtrl',
			data: {
				requireLogin: false
			}
		})
		.state('secret', {
			url: '/secret',
			templateUrl: 'views/secret.html',
			controller: function($scope, $title, User) {
				$title('Secret!')
				$scope.users = User.query()
			},
			data: {
				requireLogin: true
			}
		})
		.state('logout', {
			url: '/logout',
			controller: function($auth, $state) {
				$auth.logout().then(function() {
					$state.go('login')
				})
			},
			data: {
				requireLogin: false
			}
		})
})