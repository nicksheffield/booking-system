<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use Auth;

use Validator;

use App\Models\User as Model;

class User extends Controller
{
	public function index(Request $request)
	{
		$q = Model::query();

		// $q = $q->limit(($request->limit ?: 0));
		// $q = $q->offset(($request->offset ?: 0));
		
		if($request->with) $q = $q->with(explode('|', $request->with));

		return $q->get();
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Model $model, Request $request)
	{
		$model->fill($request->all());

		$model->password = bcrypt($request->password);
		$model->group_id = $request->group_id;

		if($request->dob) {
			$model->dob = date('Y-m-d H:i:s', strtotime($request->dob));
		} else {
			$model->dob = null;
		}

		$model->save();

		return $model;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show(Request $request, $id)
	{
		if(is_numeric($id)) {
			$find = ['id' => $id];
		} else {
			$find = ['username' => $id];
		}

		$model = Model::where($find);

		if($request->with) {
			$model = $model->with(explode('|', $request->with));
		}

		return $model->first();
		
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		if(Auth::user()->id !== (int)$id && Auth::user()->admin < 1) {
			return (new Response(['error' => 'Not allowed'], 500));
		}

		$model = Model::find($id);
		
		$model->fill($request->except('password'));
		
		if($request->group_id) {
			$model->group_id = $request->group_id;
		}

		if($request->password) {
			$model->password = bcrypt($request->password);
		}

		// dd($request->all());
		if(!$request->dob) {
			$model->dob = null;
		}
		
		$v = Validator::make($request->all(), [
			'email' => 'required|email|unique:users,email,' . $model->id
		]);

		if($v->fails()) {
			return response(['error' => 'Email already taken'], 500);
		} else {
			$model->save();

			return $model;
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$model = Model::find($id);

		$model->delete();

		return $model;
	}
}
