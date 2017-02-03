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

	public function scopeClosed($query) {
		return $query->where('closed_at', '!=', null);
	}

	public function scopeOverdue($query) {
		return $query->where('due_at', '<', Carbon::now())->where('closed_at', '!=', null);
	}

	public function scopeActive($query) {
		return $query->where('closed_at', null);
	}

	public function scopeIssued($query) {
		return $query->where('taken_at', '!=', null);
	}
	
	public function products() {
		return $this->belongsToMany('App\Models\Product', 'booking_product')->withPivot('id', 'unit_id', 'notes', 'returned_at')->withTimestamps();
	}
	
	public function user() {
		return $this->belongsTo('App\Models\User', 'user_id');
	}
}
