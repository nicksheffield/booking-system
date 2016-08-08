<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
	use SoftDeletes;
	
	protected $table = 'units';
	
	protected $fillable = [
		'unit_number'
	];
	
	public function bookings() {
		return $this->belongsToMany('App\Models\Booking', 'booking_unit')->withTimestamps();
	}
	
	public function product() {
		return $this->belongsTo('App\Models\Product');
	}
}
