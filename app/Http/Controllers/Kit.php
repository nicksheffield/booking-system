<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;

use App\Models\Kit as Model;

class Kit extends Controller
{
	public function index(Request $request) {
		$q = Model::orderBy('created_at', 'DESC')->with('products')->get();

		return $q;
	}


	public function show(Request $request, $id) {
		$q = Model::query()->where('id', $id)->with('products');

		return $q;
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

		$model->save();

		foreach($request->items as $item) {
			$data = [
				'quantity' => ($item['quantity'] ? $item['quantity'] : 1)
			];

			$model->products()->attach($item['product']['id'], $data);
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
	public function update(Model $model, Request $request)
	{
		$model->fill($request->all());

		$model->products()->detach();

		foreach($request->products as $product) {
			$data = [
				'quantity' => ($product->quantity ? $product->quantity : 1)
			];

			$model->products()->attach($product->id, $data);
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
}
