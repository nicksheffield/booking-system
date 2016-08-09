<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
	use SoftDeletes;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'first_name', 'last_name', 'email', 'phone', 'group_id', 'admin'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	public function scopeStart($query) {
		return $query;
	}
	
	public function group() {
		return $this->belongsTo('App\Models\Group', 'group_id');
	}
	
	public function bookings() {
		return $this->hasMany('App\Models\Booking', 'user_id');
	}
}
