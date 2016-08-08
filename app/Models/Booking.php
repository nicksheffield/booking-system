<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
	use SoftDeletes;
	
	protected $table = 'bookings';
	
	protected $fillable = [
		
	];
	
	public function units() {
		return $this->belongsToMany('App\Models\Unit', 'booking_unit')->withTimestamps();
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User');
	}
}
