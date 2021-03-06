<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use DB;

use App\Models\Booking as Model;
use App\Models\User;

use Carbon\Carbon;

class Booking extends Controller
{
	public function index(Request $request)
	{
		$q = Model::query();

		if($request->with) $q = $q->with(explode('|', $request->with));

		if($request->user_id) $q = $q->where('user_id', $request->user_id);

		if($request->after) $q = $q->where('created_at', '>', $request->after);

		if($request->limit) {
			$limit = $request->limit && $request->limit !== '0' ? (int)$request->limit : 10;

			$offset = $request->page ? (int)$request->page : 1;

			$q = $q->skip(($offset - 1) * $limit)->take($limit);
		}
		
		return $q->orderBy('created_at', 'DESC')->get();
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
		
		if($request->_user) {
			$model->user_id = $request->_user['id'];
		} else {
			$model->user_id = Auth::user()->id;
		}

		$user = User::find($model->user_id);

		if($user->can_book) {
			$model->created_by_id = Auth::user()->id;

			$model->save();
			
			foreach($request->products as $product) {
				if(isset($product['quantity'])) {
					for($i=0; $i<$product['quantity']; $i++) {
						$model->products()->attach($product['id']);
					}
				} else {
					$model->products()->attach($product['id']);
				}
			}
			
			return $model;
		} else {
			return response(['error' => 'not_allowed'], 400);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show(Request $request, $id)
	{
		if($request->with) {
			$model = Model::where('id', $id)->with(explode('|', $request->with))->first();
		} else {
			$model = Model::find($id);
		}

		if($model) {
			return $model;
		} else {
			return response(['error' => 'Booking not found'], 404);
		}
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
		$model = Model::find($id);
		
		$model->fill($request->all());

		# Issuing
		if($request->_req_type == 'issue') {
			$model->products()->detach();
			
			foreach($request->products as $product) {

				$data = [];

				if(isset($product['_unit'])) {
					$data['unit_id'] = $product['_unit']['id'];
				}

				$model->products()->attach($product['id'], $data);
			}

		# Returning
		} else if($request->_req_type == 'return') {

			foreach($request->products as $product) {
				$data = [];

				if(isset($product['unit'])) {
					$data['unit_id'] = $product['unit']['id'];
				}

				if(isset($product['returned_at'])) {
					$data['returned_at'] = $product['returned_at'];
				}

				if(isset($product['pivot']['notes'])) {
					$data['notes'] = $product['pivot']['notes'];
				}

				$model->products()
					->wherePivot('id', '=', $product['pivot']['id'])
					->updateExistingPivot($product['id'], $data);
			}

		# Editing a booked booking
		} else if($request->_req_type == 'edit_booked') {
			$model->products()->detach();
			
			foreach($request->products as $product) {
				$model->products()->attach($product['id']);
			}

		# Editing an issued booking
		} else if($request->_req_type == 'edit_issued') {
			$model->products()->detach();
			
			foreach($request->products as $product) {
				$data = [];

				if(isset($product['_unit'])) {
					$data['unit_id'] = $product['_unit']['id'];
				}

				$model->products()->attach($product['id'], $data);
			}
		}

		$model->save();

		return $model;
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

	/**
	 * Return count information.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function count(Request $request) {
		return ['total' => Model::query()->where('closed_at', null)->count()];
	}
}
