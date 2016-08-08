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
	
	public function unit() {
		return $this->belongsTo('App\Models\Unit');
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User');
	}
}
