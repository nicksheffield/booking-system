<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;

use App\Models\Booking as Model;

use Carbon\Carbon;

class Booking extends Controller
{
	public function index(Request $request)
	{
		$q = Model::query();

		// $q = $q->limit(($request->limit ?: 0));
		// $q = $q->offset(($request->offset ?: 0));

		if(!$request->status)                 $q = $q->active();
		if($request->status == 'overdue')     $q = $q->overdue();
		if($request->status == 'delivered')   $q = $q->delivered();
		if($request->status == 'undelivered') $q = $q->undelivered();
		if($request->status == 'closed')      $q = $q->closed();
		
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
		
		$model->user_id = Auth::user()->id;

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
		$model = Model::find($id);

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
		$model = Model::find($id);
		
		$model->fill($request->all());
		
		$model->save();

		foreach($request->products as $product) {
			$model->products()
				->wherePivot('id', '=', $product['pivot']['id'])
				->updateExistingPivot($product['id'], ['unit_id' => $product['unit']['id']]);
		}

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
}
