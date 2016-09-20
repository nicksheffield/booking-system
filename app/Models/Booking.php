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
		'user_id', 'due_at', 'pickup_at', 'taken_at'
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

	public function scopeClosed($query) {
		return $query->where('closed_at', '!=', null);
	}

	public function scopeActive($query) {
		return $query->where('closed_at', null);
	}
	
	public function products() {
		return $this->belongsToMany('App\Models\Product', 'booking_product')->withPivot('unit_id', 'notes')->withTimestamps();
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User', 'user_id');
	}
}
