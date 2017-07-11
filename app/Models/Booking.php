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
		'user_id', 'due_at', 'pickup_at', 'taken_at', 'closed_at', 'created_by_id', 'issued_by_id', 'closed_by_id'
	];

	public function scopeIssued($query) {
		return $query->whereNotNull('taken_at')
					 ->whereNull('closed_at')
					 ->where('due_at', '>', Carbon::now()->toDateTimeString());
	}

	public function scopeOverdue($query) {
		return $query->whereNotNull('taken_at')
					 ->whereNull('closed_at')
					 ->where('due_at', '<=', Carbon::now()->toDateTimeString());
	}

	public function scopeBooked($query) {
		return $query->whereNull('taken_at');
	}

	public function scopeClosed($query) {
		return $query->whereNotNull('closed_at');
	}
	
	public function products() {
		return $this->belongsToMany('App\Models\Product', 'booking_product')->withPivot('id', 'unit_id', 'notes', 'returned_at')->withTimestamps();
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User', 'user_id');
	}
}
