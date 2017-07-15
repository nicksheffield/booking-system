<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
	use SoftDeletes;

	protected $fillable = [
		'name', 'email', 'phone', 'group_id', 'admin', 'id_number', 'can_book', 'can_book_reason', 'dob', 'active'
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
	
	public function notes() {
		return $this->hasMany('App\Models\Note', 'user_id')->orderBy('created_at', 'DESC');
	}
	
	public function tutors_groups() {
		return $this->belongsToMany('App\Models\Group', 'tutor');
	}
}
