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

Route::post('/api/user', 'User@store');

Route::resource('/api/user', 'User');
Route::resource('/api/group', 'Group');
Route::resource('/api/booking', 'Booking');

Route::group(['prefix' => '/api', 'middleware' => 'jwt.auth'], function() {
	
});

// get user if have token
Route::get('/api/auth', 'AuthenticateController@index');

// send credentials to get token
Route::post('/api/auth', 'AuthenticateController@authenticate');


Route::get('/', function() {
	return view('welcome');
});