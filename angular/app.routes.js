angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/')
	
	var states = {
		
		// ------------------------------------------------------------
		// Home
		// ------------------------------------------------------------
		
		'home': {
			url: '/',
			templateUrl: 'components/home/home.html',
			controller: 'homeCtrl',
			data: {
				conditions: ['auth'],
				title: 'Home'
			}
		},

		'edit_profile': {
			url: '/home/edit_profile',
			templateUrl: 'components/manage/users/views/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth'],
				title: 'Edit Profile',
				edit_profile: true
			}
		},
		
		// ------------------------------------------------------------
		// Guest
		// ------------------------------------------------------------
		
		'register': {
			url: '/register',
			templateUrl: 'components/guest/register/register.html',
			controller: 'registerCtrl',
			data: {
				conditions: ['guest_only'],
				title: 'Register'
			}
		},
		
		'login': {
			url: '/login',
			templateUrl: 'components/guest/login/login.html',
			controller: 'loginCtrl',
			data: {
				conditions: ['guest_only'],
				title: 'Login'
			}
		},
		
		'logout': {
			url: '/logout',
			controller: ['$auth', '$location', '$store', function($auth, $location, $store) {
				$auth.logout().then(function() {
					$store.user = {}
					$store.resetBooking()
					// $invalidate.addAll()
					$location.path('login')
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
			data: {
				conditions: ['auth'],
				title: 'Book Equipment'
			}
		},
		
		'confirm_booking': {
			url: '/book/confirm',
			templateUrl: 'components/booking/confirm/confirm.html',
			controller: 'confirmCtrl',
			data: {
				conditions: ['auth'],
				title: 'Confirm booking'
			}
		},
		
		'success_booking': {
			url: '/book/success',
			templateUrl: 'components/booking/success/success.html',
			controller: 'successCtrl',
			data: {
				conditions: ['auth'],
				title: 'Booking Made'
			}
		},
		
		'manage_bookings': {
			url: '/bookings?user&group&after&before&closed&returned&booked&issued&limit&page',
			templateUrl: 'components/booking/manage/manage.html',
			controller: 'bookingsManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'All Bookings'
			}
		},
		
		'view_booking': {
			url: '/booking/:id',
			templateUrl: 'components/booking/view/view.html',
			controller: 'viewBookingCtrl',
			data: {
				conditions: ['auth'],
				title: 'View Booking',
				crumb_parent: 'manage_bookings'
			}
		},
		
		'issue_booking': {
			url: '/booking/:id/issue',
			templateUrl: 'components/booking/issue/issue.html',
			controller: 'issueCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Issue Equipment',
				crumb_parent: 'view_booking'
			}
		},
		
		'return_booking': {
			url: '/booking/:id/return',
			templateUrl: 'components/booking/return/return.html',
			controller: 'returnCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Return Equipment',
				crumb_parent: 'view_booking'
			}
		},
		
		'edit_booking': {
			url: '/booking/:id/edit',
			templateUrl: 'components/booking/edit/edit.html',
			controller: 'editBookingCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Edit Booking',
				crumb_parent: 'view_booking'
			}
		},
		
		// ------------------------------------------------------------
		// Manage
		// ------------------------------------------------------------
		
		'manage': {
			url: '/manage',
			templateUrl: 'components/manage/manage/manage.html',
			controller: 'manageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Manage'
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
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage',
				title: 'All Users'
			}
		},
		
		'new_user': {
			url: '/manage/user/new?class',
			templateUrl: 'components/manage/users/views/new.html',
			controller: 'userNewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'New User'
			}
		},
		
		'view_user': {
			url: '/manage/user/:id',
			templateUrl: 'components/manage/users/views/view.html',
			controller: 'userViewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'View User'
			}
		},
		
		'edit_user': {
			url: '/manage/user/:id/edit',
			templateUrl: 'components/manage/users/views/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				title: 'Edit User'
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
				title: 'All Class Types'
			}
		},
		
		'new_class_type': {
			url: '/manage/class_type/new',
			templateUrl: 'components/manage/class_types/views/new.html',
			controller: 'classTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				title: 'New Class Type'
			}
		},
		
		'view_class_type': {
			url: '/manage/class_type/:id',
			templateUrl: 'components/manage/class_types/views/view.html',
			controller: 'classTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				title: 'View Class Type'
			}
		},
		
		'edit_class_type': {
			url: '/manage/class_type/:id/edit',
			templateUrl: 'components/manage/class_types/views/edit.html',
			controller: 'classTypeEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class_type',
				title: 'Edit Class Type'
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
				title: 'All Classes'
			}
		},
		
		'new_class': {
			url: '/manage/class/new?type',
			templateUrl: 'components/manage/classes/views/new.html',
			controller: 'classNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				title: 'New Class'
			}
		},
		
		'view_class': {
			url: '/manage/class/:id',
			templateUrl: 'components/manage/classes/views/view.html',
			controller: 'classViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				title: 'View Class'
			}
		},
		
		'edit_class': {
			url: '/manage/class/:id/edit',
			templateUrl: 'components/manage/classes/views/edit.html',
			controller: 'classEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class',
				title: 'Edit Class'
			}
		},
		
		'allow_products_for_class': {
			url: '/manage/class/:id/allowed_products',
			templateUrl: 'components/manage/classes/views/allowed_products.html',
			controller: 'classProductCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class',
				title: 'Allow Product'
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
				title: 'All Product Types'
			}
		},
		
		'new_product_type': {
			url: '/manage/product_type/new',
			templateUrl: 'components/manage/product_types/views/new.html',
			controller: 'productTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				title: 'New Product Type'
			}
		},
		
		'view_product_type': {
			url: '/manage/product_type/:id',
			templateUrl: 'components/manage/product_types/views/view.html',
			controller: 'productTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				title: 'View Product Type'
			}
		},
		
		'edit_product_type': {
			url: '/manage/product_type/:id/edit',
			templateUrl: 'components/manage/product_types/views/edit.html',
			controller: 'productTypeEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_product_type',
				title: 'Edit Product Type'
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
				title: 'All Products'
			}
		},
		
		'new_product': {
			url: '/manage/product/new?type',
			templateUrl: 'components/manage/products/views/new.html',
			controller: 'productNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				title: 'New Product'
			}
		},
		
		'view_product': {
			url: '/manage/product/:id',
			templateUrl: 'components/manage/products/views/view.html',
			controller: 'productViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				title: 'View Product'
			}
		},
		
		'edit_product': {
			url: '/manage/product/:id/edit',
			templateUrl: 'components/manage/products/views/edit.html',
			controller: 'productEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_product',
				title: 'Edit Product'
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
				title: 'All Units'
			}
		},
		
		'new_unit': {
			url: '/manage/unit/new?product',
			templateUrl: 'components/manage/units/views/new.html',
			controller: 'unitNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				title: 'New Unit'
			}
		},
		
		'view_unit': {
			url: '/manage/unit/:id',
			templateUrl: 'components/manage/units/views/view.html',
			controller: 'unitViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				title: 'View Unit'
			}
		},
		
		'edit_unit': {
			url: '/manage/unit/:id/edit',
			templateUrl: 'components/manage/units/views/edit.html',
			controller: 'unitEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_unit',
				title: 'Edit Unit'
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