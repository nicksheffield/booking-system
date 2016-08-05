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

Route::get('/', function () {
	return view('welcome');
});


Route::get('/register', function() {
	return view('register');
});

Route::get('/secret', function() {
	return view('secret');
})->middleware('auth');


Route::post('/register', function(App\User $user, Request $request) {
	
	$user->username = $request->username;
	$user->password = bcrypt($request->password);
	$user->save();

	$login_success = Auth::attempt([
		'username' => $user->username,
		'password' => $request->password
	]);

	if($login_success) {
		return redirect('/secret');
	}

	return $user;
});


Route::get('/login', function() {
	return view('login');
});


Route::post('/login', function(Request $request) {
	$login_success = Auth::attempt([
		'username' => $request->username,
		'password' => $request->password
	]);

	if($login_success) {
		return redirect('/secret');
	} else {
		return redirect('/login')->with('error', 'Yo, that was incorrect');
	}
});

Route::get('/logout', function() {
	Auth::logout();

	return redirect('/login');
});