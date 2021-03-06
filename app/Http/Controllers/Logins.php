<?php

//// https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Auth;
use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

use App\Models\User as Model;

class Logins extends Controller
{
	public function __construct()
	{
		// Apply the jwt.auth middleware to all methods in this controller
		// except for the authenticate method. We don't want to prevent
		// the user from retrieving their token if they don't already have it
		$this->middleware('jwt.auth', ['except' => ['authenticate', 'logout']]);
	}

	public function index(Request $request) {
		
		// return Auth::user();
		
		$model = Model::where(['id' => Auth::user()->id]);

		if($request->with) {
			$model = $model->with(explode('|', $request->with));
		}

		return $model->first();
	}

	public function authenticate(Request $request) {
		// $credentials = $request->only('email', 'password');
		$credentials = [];

		if(strpos($request->email, '@') !== false) {
			$credentials['email'] = $request->email;
		} else {
			$credentials['id_number'] = $request->email;
		}

		$credentials['password'] = $request->password;
		
		JWTAuth::attempt($credentials);
		
		$user = Auth::user();

		if($user && !$user->active) {
			Auth::logout();
			
			return response()->json(['error' => 'user_is_inactive'], 401);
		}

		try {
			// verify the credentials and create a token for the user
			if (!$user || !$token = JWTAuth::attempt($credentials, ['admin' => $user->admin])) {
				return response()->json(['error' => 'invalid_credentials'], 401);
			}
		} catch (JWTException $e) {
			// something went wrong
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		$user = Auth::user();

		// if no errors are encountered we can return a JWT
		return response()->json(compact('token', 'user'));

	}

	function logout() {
		Auth::logout();

		return [
			'success' => true
		];
	}
}
