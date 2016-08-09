<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Carbon\Carbon;

class Booking extends Model
{
	use SoftDeletes;
	
	protected $table = 'bookings';
	
	protected $fillable = [
		'user_id'
	];

	public function scopeOverdue($query) {
		return $query->where('due_at', '<', Carbon::now());
	}

	public function scopeUndelivered($query) {
		return $query->where('delivered_at', null);
	}

	public function scopeDelivered($query) {
		return $query->where('delivered_at', '!=', null);
	}

	public function scopeReturned($query) {
		return $query->where('returned_at', '!=', null);
	}

	public function scopeActive($query) {
		return $query->where('returned_at', null);
	}
	
	public function units() {
		return $this->belongsToMany('App\Models\Unit', 'booking_unit')->withTimestamps();
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User', 'user_id');
	}
}
