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


// Route::resource('/api/user', 'User');
// Route::resource('/api/group', 'Group');
// Route::resource('/api/booking', 'Booking');

Route::group(['prefix' => '/api'], function() {
	Route::get('auth', 'AuthenticateController@index');
	Route::post('auth', 'AuthenticateController@authenticate');

	Route::get('user', 'Group@index');
	Route::post('user', 'User@store');

	Route::get('group', 'Group@index');
});

Route::group(['prefix' => '/api', 'middleware' => 'jwt.auth'], function() {
	Route::get('user/{id}', 'User@show');
});

Route::get('/', function() {
	return view('welcome');
});