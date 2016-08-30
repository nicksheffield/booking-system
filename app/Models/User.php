<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
	use SoftDeletes;

	protected $fillable = [
		'first_name', 'last_name', 'email', 'phone', 'group_id', 'admin', 'id_number'
	];

	protected $hidden = [
		'password', 'remember_token',
	]; 
	
	public function group() {
		return $this->belongsTo('App\Models\Group', 'group_id');
	}
	
	public function bookings() {
		return $this->hasMany('App\Models\Booking', 'user_id');
	}
	
	public function tutors_group() {
		return $this->belongsToMany('App\Models\Group', 'tutor');
	}
}
