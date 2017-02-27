<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;

use App\Models\Note as Model;

class Note extends Controller
{
	public function index(Request $request) {
		$q = Model::all();

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
		$model->writer_id = Auth::user()->id;

		$model->save();

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
		$old_model = Model::find($id);
		$old_model->is_old = true;
		$old_model->save();

		$model = new Model();
		$model->content = $request->content;
		$model->user_id = $request->user_id;
		// $model->revision_of = $old_model->revision_of ?: $id;
		$model->revision_of = $id;
		$model->writer_id = Auth::user()->id;
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
