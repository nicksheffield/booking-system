<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/**
*	Unprotected routes
*/
Route::group(['prefix' => '/api'], function() {
	/**
	*	Login page and submission
	*/
	Route::get('auth', 'Logins@index');
	Route::post('auth', 'Logins@authenticate');

	/**
	*	Get all users
	*/
	Route::get('user', 'User@index');

	/**
	*	Create user
	*/
	Route::post('user', 'User@store');

	/**
	*	Get all groups
	*/
	Route::get('group', 'Group@index');
});

/**
*	Protected routes
*/
Route::group(['prefix' => '/api', 'middleware' => 'jwt.auth'], function() {
	/**
	*	Get one user
	*	Update user
	*	Delete user
	*/
	Route::resource('user', 'User', ['except' => ['index', 'store']]);

	/**
	*	Get one note
	*	Update note
	*	Delete note
	*/
	Route::resource('note', 'Note', ['except' => ['show']]);

	/**
	*	Get one group
	*	Create a group
	*	Update group
	*	Delete group
	*/
	Route::resource('group', 'Group', ['except' => 'index']);
	
	/**
	*	Get all group types
	*	Get one group type
	*	Create a group type
	*	Update group type
	*	Delete group type
	*/
	Route::resource('group_type', 'GroupType');
	
	/**
	*	Get all product types
	*	Get one product type
	*	Create a product type
	*	Update product type
	*	Delete product type
	*/
	Route::resource('product_type', 'ProductType');
	
	/**
	*	Get all products
	*	Get one product
	*	Create a product
	*	Update product
	*	Delete product
	*/
	Route::resource('product', 'Product');
	
	/**
	*	Give permission for a product to a group
	*/
	Route::post('/product/{product_id}/allow/{group_id}', 'Product@allow_product');
	
	/**
	*	Revoke permission for a product to a group
	*/
	Route::post('/product/{product_id}/disallow/{group_id}', 'Product@disallow_product');
	
	/**
	*	Update permission for a product for a group
	*/
	Route::put('/product/{product_id}/allow/{group_id}', 'Product@update_allow_product');
	
	/**
	*	Check if a product is available to be booked
	*/
	Route::post('/product/{product_id}/check', 'Product@check_availability');
	
	/**
	*	Get all units
	*	Get one unit
	*	Create a unit
	*	Update unit
	*	Delete unit
	*/
	Route::resource('unit', 'Unit');

	/**
	*   Get bookings count
	*/
	Route::get('/booking/count', 'Booking@count');

	/**
	*	Get all bookings
	*	Get one booking
	*	Create a booking
	*	Update booking
	*	Delete booking
	*/
	Route::resource('booking', 'Booking');
});


/**
*	Home page (angular)
*/
Route::get('/', function() { return view('welcome'); });
Route::get('{all}', function() { return view('welcome'); });