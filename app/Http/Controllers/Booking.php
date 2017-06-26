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
		$limit = $request->limit && $request->limit !== '0' ? (int)$request->limit : 10;

		$offset = $request->page ? (int)$request->page : 1;

		$q = Model::query();

		if($request->with) $q = $q->with(explode('|', $request->with));

		if($request->user) $q = $q->where('user_id', $request->user);

		$q = $q->orderBy('created_at');

		$q = $q->skip(($offset - 1) * $limit)->take($limit);
		
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
		// dd($request->all());

		$model = Model::find($id);
		
		$model->fill($request->all());


		# Returning
		if(isset($request->products[0]['created_at'])) {
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

				// dd($product, $data);

				$model->products()
					->wherePivot('id', '=', $product['pivot']['id'])
					->updateExistingPivot($product['id'], $data);
			}

		# Editing
		} else {
			$model->products()->detach();
			
			foreach($request->products as $product) {
				for($i=0; $i<$product['quantity']; $i++) {
					$model->products()->attach($product['id']);
				}
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
