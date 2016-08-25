<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
	use SoftDeletes;
	
	protected $table = 'units';
	
	protected $fillable = [
		'serial_number', 'asset_number', 'unit_number', 'product_id', 'notes'
	];
	
	public function bookings() {
		return $this->belongsToMany('App\Models\Booking', 'booking_unit')->withTimestamps();
	}
	
	public function product() {
		return $this->belongsTo('App\Models\Product', 'product_id');
	}
}
