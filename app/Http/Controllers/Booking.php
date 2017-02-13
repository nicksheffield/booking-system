<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use DB;

use App\Models\Booking as Model;

use Carbon\Carbon;

class Booking extends Controller
{
	public function index(Request $request)
	{
		$q = Model::query();

		if($request->after) {
			$q = $q->where('pickup_at', '>', Carbon::createFromTimestamp($request->after)->toDateTimeString());
		}

		if($request->before) {
			$q = $q->where('pickup_at', '<', Carbon::createFromTimestamp($request->before)->toDateTimeString());
		}

		if($request->booked == 'true') {
			$q2 = clone $q;
			$q->union($q2->booked());
		}

		if($request->overdue == 'true') {
			$q2 = clone $q;
			$q->union($q2->overdue());
		}

		if($request->issued == 'true') {
			$q2 = clone $q;
			$q->union($q2->issued());
		}

		if($request->closed == 'true') {
			$q2 = clone $q;
			$q->union($q2->closed());
		}

		$q = $q->where('id', 0);

		if($request->user_id) {
			$q = $q->where('user_id', $request->user_id);
		}

		if($request->booked == 'false' && $request->overdue == 'false' && $request->issued == 'false' && $request->closed == 'false') {
			return [];
		} else {
			return $q->get();
		}
		

		// DB::enableQueryLog(); $q->get(); dd(DB::getQueryLog());
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

		$model->created_by_id = Auth::user()->id;

		$model->save();
		
		foreach($request->products as $product) {
			for($i=0; $i<$product['quantity']; $i++) {
				$model->products()->attach($product['id']);
			}
		}

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
		if($request->with) {
			$model = Model::where('id', $id)->with(explode('|', $request->with))->first();
		} else {
			$model = Model::find($id);
		}

		return $model;
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
		$q = Model::query();

		if($request->after) {
			$q = $q->where('pickup_at', '>', Carbon::createFromTimestamp($request->after)->toDateTimeString());
		}

		if($request->before) {
			$q = $q->where('pickup_at', '<', Carbon::createFromTimestamp($request->before)->toDateTimeString());
		}

		if($request->booked == 'true') {
			$q2 = clone $q;
			$q->union($q2->booked());
		}

		if($request->overdue == 'true') {
			$q2 = clone $q;
			$q->union($q2->overdue());
		}

		if($request->issued == 'true') {
			$q2 = clone $q;
			$q->union($q2->issued());
		}

		if($request->closed == 'true') {
			$q2 = clone $q;
			$q->union($q2->closed());
		}

		$q = $q->where('id', 0);

		if($request->user_id) {
			$q = $q->where('user_id', $request->user_id);
		}

		// if($request->group_id) {
		// 	$q = $q->where('group_id', $request->group_id);
		// }

		return ['total' => count($q->get())];
	}
}
