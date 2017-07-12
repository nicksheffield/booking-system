angular.module('app.routes')

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.hashPrefix('')
	$locationProvider.html5Mode(true)

	$urlRouterProvider.otherwise('/')
	
	var states = {
		
		// ------------------------------------------------------------
		// Home
		// ------------------------------------------------------------
		
		'home': {
			url: '/',
			templateUrl: 'pages/misc/home/home.html',
			controller: 'homeCtrl',
			data: {
				conditions: ['auth'],
				title: 'Home'
			}
		},

		'edit_profile': {
			url: '/home/edit-profile',
			templateUrl: 'pages/manage/users/edit/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth'],
				title: 'Edit Profile',
				edit_profile: true
			}
		},

		'set_password': {
			url: '/set_password',
			templateUrl: 'pages/manage/users/password/password.html',
			controller: 'userPasswordCtrl',
			data: {
				conditions: ['auth'],
				title: 'Set Password'
			}
		},
		
		// ------------------------------------------------------------
		// Guest
		// ------------------------------------------------------------
		
		'login': {
			url: '/login',
			templateUrl: 'pages/misc/login/login.html',
			controller: 'loginCtrl',
			data: {
				conditions: ['guest_only'],
				title: 'Login'
			}
		},
		
		'logout': {
			url: '/logout',
			controller: ['$auth', '$location', '$store', '$http', function($auth, $location, $store, $http) {
				$auth.logout().then(function() {
					$store.user = {}
					$store.resetBooking()
					$http.get('/api/logout')
					$location.path('login')
				})
			}]
		},
		
		'reset_password': {
			url: '/reset_password',
			templateUrl: 'pages/misc/reset/reset.html',
			controller: 'resetCtrl',
			data: {
				conditions: ['guest_only'],
				title: 'Reset Password'
			}
		},

		// ------------------------------------------------------------
		// Manager only
		// ------------------------------------------------------------

		'site_settings': {
			url: '/site-settings',
			templateUrl: 'pages/misc/site-settings/site-settings.html',
			controller: 'siteSettingsCtrl',
			data: {
				conditions: ['manager_only'],
				title: 'Site Settings'
			}
		},
		
		// ------------------------------------------------------------
		// Booking
		// ------------------------------------------------------------
		
		'make_booking': {
			url: '/book',
			templateUrl: 'pages/booking/make/make.html',
			controller: 'makeCtrl',
			data: {
				conditions: ['auth'],
				title: 'Book Equipment'
			}
		},
		
		'confirm_booking': {
			url: '/book/confirm',
			templateUrl: 'pages/booking/confirm/confirm.html',
			controller: 'confirmCtrl',
			data: {
				conditions: ['auth'],
				title: 'Confirm booking',
				crumb_parent: 'make_booking'
			}
		},
		
		'success_booking': {
			url: '/book/success',
			templateUrl: 'pages/booking/success/success.html',
			controller: 'successCtrl',
			data: {
				conditions: ['auth'],
				title: 'Booking Made'
			}
		},
		
		'manage_bookings': {
			url: '/bookings?user&group&after&before&closed&returned&booked&issued&overdue&limit&page',
			templateUrl: 'pages/booking/manage/manage.html',
			controller: 'bookingsManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'All Bookings'
			}
		},
		
		'view_booking': {
			url: '/booking/:id',
			templateUrl: 'pages/booking/view/view.html',
			controller: 'viewBookingCtrl',
			data: {
				conditions: ['auth'],
				title: 'View Booking',
				crumb_parent: 'manage_bookings'
			}
		},
		
		'issue_booking': {
			url: '/booking/:id/issue',
			templateUrl: 'pages/booking/issue/issue.html',
			controller: 'issueCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Issue Equipment',
				crumb_parent: 'view_booking'
			}
		},
		
		'return_booking': {
			url: '/booking/:id/return',
			templateUrl: 'pages/booking/return/return.html',
			controller: 'returnCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'Return Equipment',
				crumb_parent: 'view_booking'
			}
		},
		
		'edit_booking': {
			url: '/booking/:id/edit',
			templateUrl: 'pages/booking/edit/edit.html',
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
			templateUrl: 'pages/manage/manage/manage.html',
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
			templateUrl: 'pages/manage/users/manage/manage.html',
			controller: 'userManageCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				title: 'All Users'
			}
		},
		
		'new_user': {
			url: '/manage/user/new?class',
			templateUrl: 'pages/manage/users/new/new.html',
			controller: 'userNewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'New User'
			}
		},
		
		'import_users': {
			url: '/manage/user/import',
			templateUrl: 'pages/manage/users/import/import.html',
			controller: 'userImportCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'Import Users'
			}
		},
		
		'export_users': {
			url: '/manage/user/export',
			templateUrl: 'pages/manage/users/export/export.html',
			controller: 'userExportCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'Export Users'
			}
		},
		
		'view_user': {
			url: '/manage/user/:id',
			templateUrl: 'pages/manage/users/view/view.html',
			controller: 'userViewCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_users',
				title: 'View User'
			}
		},
		
		'edit_user': {
			url: '/manage/user/:id/edit',
			templateUrl: 'pages/manage/users/edit/edit.html',
			controller: 'userEditCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				title: 'Edit User'
			}
		},
		
		'new_note': {
			url: '/manage/user/:id/note/new',
			templateUrl: 'pages/manage/users/new_note/new_note.html',
			controller: 'userNewNoteCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				title: 'New Note'
			}
		},
		
		'view_note': {
			url: '/manage/user/:id/note/:id2',
			templateUrl: 'pages/manage/users/view_note/view_note.html',
			controller: 'userViewNoteCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				title: 'View Note'
			}
		},
		
		'edit_note': {
			url: '/manage/user/:id/note/:id2/edit',
			templateUrl: 'pages/manage/users/edit_note/edit_note.html',
			controller: 'userEditNoteCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'view_user',
				title: 'Edit Note'
			}
		},
		
		// ------------------------------------------------------------
		// Manage Class Types
		// ------------------------------------------------------------
		
		'manage_class_types': {
			url: '/manage/class-type',
			templateUrl: 'pages/manage/class-types/manage/manage.html',
			controller: 'classTypeManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Class Types'
			}
		},
		
		'new_class_type': {
			url: '/manage/class-type/new',
			templateUrl: 'pages/manage/class-types/new/new.html',
			controller: 'classTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				title: 'New Class Type'
			}
		},
		
		'view_class_type': {
			url: '/manage/class-type/:id',
			templateUrl: 'pages/manage/class-types/view/view.html',
			controller: 'classTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class_types',
				title: 'View Class Type'
			}
		},
		
		'edit_class_type': {
			url: '/manage/class-type/:id/edit',
			templateUrl: 'pages/manage/class-types/edit/edit.html',
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
			templateUrl: 'pages/manage/classes/manage/manage.html',
			controller: 'classManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Classes'
			}
		},
		
		'new_class': {
			url: '/manage/class/new?type&code',
			templateUrl: 'pages/manage/classes/new/new.html',
			controller: 'classNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				title: 'New Class'
			}
		},
		
		'view_class': {
			url: '/manage/class/:id',
			templateUrl: 'pages/manage/classes/view/view.html',
			controller: 'classViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_class',
				title: 'View Class'
			}
		},
		
		'edit_class': {
			url: '/manage/class/:id/edit',
			templateUrl: 'pages/manage/classes/edit/edit.html',
			controller: 'classEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_class',
				title: 'Edit Class'
			}
		},
		
		'allow_products_for_class': {
			url: '/manage/class/:id/allowed_products',
			templateUrl: 'pages/manage/classes/allowed_products/allowed_products.html',
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
			url: '/manage/product-type',
			templateUrl: 'pages/manage/product-types/manage/manage.html',
			controller: 'productTypeManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Product Types'
			}
		},
		
		'new_product_type': {
			url: '/manage/product-type/new',
			templateUrl: 'pages/manage/product-types/new/new.html',
			controller: 'productTypeNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				title: 'New Product Type'
			}
		},
		
		'view_product_type': {
			url: '/manage/product-type/:id',
			templateUrl: 'pages/manage/product-types/view/view.html',
			controller: 'productTypeViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product_type',
				title: 'View Product Type'
			}
		},
		
		'edit_product_type': {
			url: '/manage/product-type/:id/edit',
			templateUrl: 'pages/manage/product-types/edit/edit.html',
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
			templateUrl: 'pages/manage/products/manage/manage.html',
			controller: 'productManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Products'
			}
		},
		
		'new_product': {
			url: '/manage/product/new?type&name',
			templateUrl: 'pages/manage/products/new/new.html',
			controller: 'productNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				title: 'New Product'
			}
		},
		
		'view_product': {
			url: '/manage/product/:id',
			templateUrl: 'pages/manage/products/view/view.html',
			controller: 'productViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_product',
				title: 'View Product'
			}
		},
		
		'edit_product': {
			url: '/manage/product/:id/edit',
			templateUrl: 'pages/manage/products/edit/edit.html',
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
			templateUrl: 'pages/manage/units/manage/manage.html',
			controller: 'unitManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Units'
			}
		},
		
		'new_unit': {
			url: '/manage/unit/new?product',
			templateUrl: 'pages/manage/units/new/new.html',
			controller: 'unitNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				title: 'New Unit'
			}
		},
		
		'import_units': {
			url: '/manage/unit/import',
			templateUrl: 'pages/manage/units/import/import.html',
			controller: 'unitImportCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_units',
				title: 'Import Units'
			}
		},
		
		'export_units': {
			url: '/manage/unit/export',
			templateUrl: 'pages/manage/units/export/export.html',
			controller: 'unitExportCtrl',
			data: {
				conditions: ['auth', 'staff_only'],
				crumb_parent: 'manage_units',
				title: 'Export Units'
			}
		},
		
		'view_unit': {
			url: '/manage/unit/:id',
			templateUrl: 'pages/manage/units/view/view.html',
			controller: 'unitViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_unit',
				title: 'View Unit'
			}
		},
		
		'edit_unit': {
			url: '/manage/unit/:id/edit',
			templateUrl: 'pages/manage/units/edit/edit.html',
			controller: 'unitEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_unit',
				title: 'Edit Unit'
			}
		},

		// ------------------------------------------------------------
		// Manage Units
		// ------------------------------------------------------------
		
		'manage_kit': {
			url: '/manage/kit',
			templateUrl: 'pages/manage/kits/manage/manage.html',
			controller: 'kitManageCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				title: 'All Kits'
			}
		},
		
		'new_kit': {
			url: '/manage/kit/new?product',
			templateUrl: 'pages/manage/kits/new/new.html',
			controller: 'kitNewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_kit',
				title: 'New Kit'
			}
		},
		
		'view_kit': {
			url: '/manage/kit/:id',
			templateUrl: 'pages/manage/kits/view/view.html',
			controller: 'kitViewCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'manage_kit',
				title: 'View Kit'
			}
		},
		
		'edit_kit': {
			url: '/manage/kit/:id/edit',
			templateUrl: 'pages/manage/kits/edit/edit.html',
			controller: 'kitEditCtrl',
			data: {
				conditions: ['auth', 'manager_only'],
				crumb_parent: 'view_kit',
				title: 'Edit Kit'
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