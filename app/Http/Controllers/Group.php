<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Models\Group as Model;

class Group extends Controller
{
	public function index(Request $request)
	{
		$models = Model::query();

		$models = $models->limit(($request->limit ?: 20));
		$models = $models->offset(($request->offset ?: 0));

		if($request->status) {
			if($request->status == 'late') {
				$models = $models->late();
			}
		}
		if($request->with) {
			$with = explode('|', $request->with);
			$models = $models->with($with);
		}

		return $models->get();
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
			$find = ['code' => $id];
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
		$model = Model::find($id);
		
		$model->fill($request->all());
		
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
