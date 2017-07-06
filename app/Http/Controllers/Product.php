<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Carbon\Carbon;
use Auth;

use App\Models\Product as Model;
use App\Models\Booking;

class Product extends Controller
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
	
	
	
	public function allow_product(Request $request, $product_id, $group_id) {
		$model = Model::find($product_id);
		
		$success = $model->groups_allowed()->attach($group_id, [
			'quantity' => $request->quantity ?: 1,
			'days_allowed' => $request->days_allowed
		]);
		
		return [
			'message' => 'success'
		];
	}
	
	
	
	public function disallow_product(Request $request, $product_id, $group_id) {
		$model = Model::find($product_id);
		
		$success = $model->groups_allowed()->detach($group_id);
		
		return [
			'message' => 'success'
		];
	}
	
	
	
	public function update_allow_product(Request $request, $product_id, $group_id) {
		$model = Model::find($product_id);
		
		$success = $model->groups_allowed()->updateExistingPivot($group_id, [
			'quantity' => $request->quantity,
			'days_allowed' => $request->days_allowed
		]);
		
		return [
			'message' => 'success'
		];
	}



	public function check_availability(Request $request, $product_id) {
		function checkAvailable($bookings, $product, $product_id, $request) {
			$matches = 0;

			foreach($bookings as $booking) {
				foreach($booking->products as $product) {
					if($product->id == $product_id) $matches += $request->quantity;
				}
			}

			return $matches < $product->units()->count();
		}

		$pickup = Carbon::parse($request->pickup_at);
		$due = Carbon::parse($request->due_at);

		$bookings = Booking::query()
			->where('due_at', '>', $pickup)
			->where('pickup_at', '<', $due)
			->get();

		$thisProduct = Model::find($product_id);

		$prevBookings = [];

		// look at all relevant bookings
		foreach($bookings as $booking) {
			// if any of them are for this user
			if($booking->user->id == Auth::user()->id) {
				// add it to the list of prevBookings
				$prevBookings[] = $booking;
			}
		}

		// if there are any prevBookings
		if(count($prevBookings)) {

			// make a list of products
			$prods = [];

			// for each of the previous bookings
			foreach($prevBookings as $prevBooking) {
				// look at every product in all of them
				foreach($prevBooking->products as $product) {
					// if the product is in the $prods array, then increase its count by 1
					if(isset($prods[$product->id])) {
						$prods[$product->id] += 1;
					// if the product is not in the $prods array, then set its count as 1
					} else {
						$prods[$product->id] = 1;
					}
				}
			}

			// now that we have a list of all booked products, and how many..
			// then lets check if each one is under or at the limit allowed by this users group

			// if this user is in a group
			if(Auth::user()->group) {
				// then check every allowed product for the group
				foreach(Auth::user()->group->allowed_products as $product) {
					// if any of them match the product the user is trying to book...
					if($product->id == $thisProduct->id) {
						// if the amount that are currently booked (plus the amount they want to book)
						// is less than the amount they are allowed
						//echo $prods[$product->id] + $request->quantity .'/'. $product->pivot->quantity . '/'. ($prods[$product->id] + $request->quantity <= $product->pivot->quantity ? 'true' : 'false');
						if($prods[$product->id] + $request->quantity <= $product->pivot->quantity) {
							// then do the standard check
							$allowed = checkAvailable($bookings, $thisProduct, $product_id, $request);
						} else {
							$allowed = false;
						}
					}
				}
			// if the user is not in a group (ie, staff or manager)
			} else {
				// then do the standard check
				$allowed = checkAvailable($bookings, $thisProduct, $product_id, $request);
			}


		} else if($thisProduct->limitless) {
			$allowed = true;
		} else {
			$allowed = checkAvailable($bookings, $thisProduct, $product_id, $request);
		}

		$response = [
			'id' => $product_id,
			'allowed' => $allowed
		];

		return $response;
	}
}
