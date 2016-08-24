angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')
	
	var states = {
		'home': {
			url: '/',
			templateUrl: 'components/home/home.html',
			controller: 'homeCtrl',
			data: {conditions: ['auth']}
		},
		'register': {
			url: '/register',
			templateUrl: 'components/guest/views/register.html',
			controller: 'registerCtrl'
		},
		'login': {
			url: '/login',
			templateUrl: 'components/guest/views/login.html',
			controller: 'loginCtrl'
		},
		'logout': {
			url: '/logout',
			controller: ['$auth', '$state', '$store', function($auth, $state, $store) {
				$auth.logout().then(function() {
					$state.go('login')
					$store.user = {}
				})
			}]
		},
		'manage': {
			url: '/manage',
			templateUrl: 'components/manage/manage.html',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_name: 'Manage'
			}
		},
		'manage_users': {
			url: '/manage/users',
			templateUrl: 'components/manage/users/views/manage.html',
			controller: 'userManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Users'
			}
		},
		'view_user': {
			url:'/view_user/:id',
			templateUrl: 'components/manage/users/views/view.html',
			controller: 'userViewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				crumb_name: 'View User'
			}
		},
		'edit_user': {
			url: '/edit_user/:id',
			templateUrl: 'components/manage/users/views/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				crumb_name: 'Update User'
			}
		},
		'new_user': {
			url: '/new_user',
			templateUrl: 'components/manage/users/views/new.html',
			controller: 'userNewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				crumb_name: 'New User'
			}
		},
		'manage_class_types': {
			url: '/manage/class_types',
			templateUrl: 'components/manage/class_types/views/manage.html',
			controller: 'classTypeManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Class Types'
			}
		},
		'view_class_type': {
			url: '/view_class_type/:id',
			templateUrl: 'components/manage/class_types/views/view.html',
			controller: 'classTypeViewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_class_types',
				crumb_name: 'View Class Type'
			}
		},
		'edit_class_type': {
			url: '/edit_class_type/:id',
			templateUrl: 'components/manage/class_types/views/edit.html',
			controller: 'classTypeEditCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_class_type',
				crumb_name: 'Update Class Type'
			}
		},
		'new_class_type': {
			url: '/new_class_type',
			templateUrl: 'components/manage/class_types/views/new.html',
			controller: 'classTypeNewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_class_types',
				crumb_name: 'New Class Type'
			}
		},
		'manage_class': {
			url: '/manage/classes',
			templateUrl: 'components/manage/class/views/manage.html',
			controller: 'classManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: ['manage'],
				crumb_name: 'Classes'
			}
		},
		'new_class': {
			url: '/new_class',
			templateUrl: 'components/manage/class/views/new.html',
			controller: 'classNewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumbs: ['manage', 'manage_class'],
				crumb_name: 'New Class'
			}
		},
	}
	
	for(var stateName in states) {
		var state = states[stateName]
		
		if(state.data && state.data.crumb_parent) {
			state.data.crumb_parent = states[state.data.crumb_parent]
		}
		
		$stateProvider.state(stateName, state)
	}
})