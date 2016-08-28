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
			controller: 'registerCtrl',
			data: {conditions: ['guest_only']}
		},
		'login': {
			url: '/login',
			templateUrl: 'components/guest/views/login.html',
			controller: 'loginCtrl',
			data: {conditions: ['guest_only']}
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
		
		// ------------------------------------------------------------
		// Booking
		// ------------------------------------------------------------
		
		'make_booking': {
			url: '/book',
			templateUrl: 'components/booking/make/make.html',
			controller: 'makeCtrl',
			data: {conditions: ['auth']}
		},
		
		// ------------------------------------------------------------
		// Manage
		// ------------------------------------------------------------
		
		'manage': {
			url: '/manage',
			templateUrl: 'components/manage/manage.html',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_name: 'Manage'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Users
		// ------------------------------------------------------------
		'manage_users': {
			url: '/manage/user',
			templateUrl: 'components/manage/users/views/manage.html',
			controller: 'userManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Users'
			}
		},
		'new_user': {
			url: '/manage/user/new',
			templateUrl: 'components/manage/users/views/new.html',
			controller: 'userNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_users',
				crumb_name: 'New User'
			}
		},
		'view_user': {
			url: '/manage/user/:id',
			templateUrl: 'components/manage/users/views/view.html',
			controller: 'userViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_users',
				crumb_name: 'View User'
			}
		},
		'edit_user': {
			url: '/manage/user/:id/edit',
			templateUrl: 'components/manage/users/views/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_user',
				crumb_name: 'Edit User'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Class Types
		// ------------------------------------------------------------
		'manage_class_types': {
			url: '/manage/class_type',
			templateUrl: 'components/manage/class_types/views/manage.html',
			controller: 'classTypeManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Class Types'
			}
		},
		'new_class_type': {
			url: '/manage/class_type/new',
			templateUrl: 'components/manage/class_types/views/new.html',
			controller: 'classTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				crumb_name: 'New Class Type'
			}
		},
		'view_class_type': {
			url: '/manage/class_type/:id',
			templateUrl: 'components/manage/class_types/views/view.html',
			controller: 'classTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				crumb_name: 'View Class Type'
			}
		},
		'edit_class_type': {
			url: '/manage/class_type/:id/edit',
			templateUrl: 'components/manage/class_types/views/edit.html',
			controller: 'classTypeEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class_type',
				crumb_name: 'Edit Class Type'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Classes
		// ------------------------------------------------------------
		'manage_class': {
			url: '/manage/class',
			templateUrl: 'components/manage/classes/views/manage.html',
			controller: 'classManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Classes'
			}
		},
		'new_class': {
			url: '/manage/class/new',
			templateUrl: 'components/manage/classes/views/new.html',
			controller: 'classNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				crumb_name: 'New Class'
			}
		},
		'view_class': {
			url: '/manage/class/:id',
			templateUrl: 'components/manage/classes/views/view.html',
			controller: 'classViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				crumb_name: 'View Class'
			}
		},
		'edit_class': {
			url: '/manage/class/:id/edit',
			templateUrl: 'components/manage/classes/views/edit.html',
			controller: 'classEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class',
				crumb_name: 'Edit Class'
			}
		},
		'allow_products_for_class': {
			url: '/manage/class/:id/allowed_products',
			templateUrl: 'components/manage/classes/views/allowed_products.html',
			controller: 'classProductCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class',
				crumb_name: 'Allow Product'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Product Types
		// ------------------------------------------------------------
		'manage_product_type': {
			url: '/manage/product_type',
			templateUrl: 'components/manage/product_types/views/manage.html',
			controller: 'productTypeManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Product Types'
			}
		},
		'new_product_type': {
			url: '/manage/product_type/new',
			templateUrl: 'components/manage/product_types/views/new.html',
			controller: 'productTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				crumb_name: 'New Product Type'
			}
		},
		'view_product_type': {
			url: '/manage/product_type/:id',
			templateUrl: 'components/manage/product_types/views/view.html',
			controller: 'productTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				crumb_name: 'View Product Type'
			}
		},
		'edit_product_type': {
			url: '/manage/product_type/:id/edit',
			templateUrl: 'components/manage/product_types/views/edit.html',
			controller: 'productTypeEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_product_type',
				crumb_name: 'Edit Product Type'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Products
		// ------------------------------------------------------------
		'manage_product': {
			url: '/manage/product',
			templateUrl: 'components/manage/products/views/manage.html',
			controller: 'productManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Products'
			}
		},
		'new_product': {
			url: '/manage/product/new',
			templateUrl: 'components/manage/products/views/new.html',
			controller: 'productNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				crumb_name: 'New Product'
			}
		},
		'view_product': {
			url: '/manage/product/:id',
			templateUrl: 'components/manage/products/views/view.html',
			controller: 'productViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				crumb_name: 'View Product'
			}
		},
		'edit_product': {
			url: '/manage/product/:id/edit',
			templateUrl: 'components/manage/products/views/edit.html',
			controller: 'productEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_product',
				crumb_name: 'Edit Product'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Units
		// ------------------------------------------------------------
		'manage_unit': {
			url: '/manage/unit',
			templateUrl: 'components/manage/units/views/manage.html',
			controller: 'unitManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage',
				crumb_name: 'All Units'
			}
		},
		'new_unit': {
			url: '/manage/unit/new',
			templateUrl: 'components/manage/units/views/new.html',
			controller: 'unitNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				crumb_name: 'New Unit'
			}
		},
		'view_unit': {
			url: '/manage/unit/:id',
			templateUrl: 'components/manage/units/views/view.html',
			controller: 'unitViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				crumb_name: 'View Unit'
			}
		},
		'edit_unit': {
			url: '/manage/unit/:id/edit',
			templateUrl: 'components/manage/units/views/edit.html',
			controller: 'unitEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_unit',
				crumb_name: 'Edit Unit'
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