angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')
	
	var states = {
		'home': {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'homeCtrl',
			data: {conditions: ['auth']}
		},
		'register': {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'registerCtrl'
		},
		'login': {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		},
		'logout': {
			url: '/logout',
			controller: function($auth, $state, $store) {
				$auth.logout().then(function() {
					$state.go('login')
					$store.user = {}
				})
			}
		},
		'manage': {
			url: '/manage',
			templateUrl: 'views/manage.html',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_name: 'Manage'
			}
		},
		'manage_users': {
			url: '/manage/users',
			templateUrl: 'views/manage_users.html',
			controller: 'manageUsersCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: [ 'manage' ],
				crumb_name: 'All Users'
			}
		},
		'view_user': {
			url:'/view_user/:id',
			templateUrl: 'views/view_user.html',
			controller: 'viewUserCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: [ 'manage', 'manage_users' ],
				crumb_name: 'View User'
			}
		},
		'edit_user': {
			url: '/edit_user/:id',
			templateUrl: 'views/edit_user.html',
			controller: 'editUserCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: [ 'manage', 'manage_users', 'view_user'],
				crumb_name: 'Update User'
			}
		},
		'manage_class_types': {
			url: '/manage/class_types',
			templateUrl: 'views/manage_class_types.html',
			controller: 'manageClassTypesCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: [ 'manage'],
				crumb_name: 'All Class Types'
			}
		}
	}
	
	for(var stateName in states) {
		var state = states[stateName]
		
		if(state.data && state.data.crumbs) {
			for(var i=0; i<state.data.crumbs.length; i++) {
				state.data.crumbs[i] = states[state.data.crumbs[i]]
			}
		}
		
		$stateProvider.state(stateName, state)
	}
})