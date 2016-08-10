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


Route::group(['prefix' => '/api', 'middleware' => 'jwt.auth'], function() {
	Route::resource('/user', 'User');
	Route::resource('/group', 'Group');
	Route::resource('/booking', 'Booking');
});

// get user if have token
Route::get('/api/auth', 'AuthenticateController@index');

// send credentials to get token
Route::post('/api/auth', 'AuthenticateController@authenticate');


Route::get('/', function() {
	return view('welcome');
});