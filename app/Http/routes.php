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

use Illuminate\Http\Request;

/**
*	Home page (angular)
*/
Route::get('/', function() { return view('welcome'); });

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
	*	Get all product
	*	Get one product
	*	Create a product
	*	Update product
	*	Delete product
	*/
	Route::resource('product', 'Product');
	
	/**
	*	Get all units
	*	Get one units
	*	Create a units
	*	Update units
	*	Delete units
	*/
	Route::resource('unit', 'Unit');
});