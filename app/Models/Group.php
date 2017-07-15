<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
	use SoftDeletes;
	
	protected $table = 'groups';
	
	protected $fillable = [
		'code', 'group_type_id', 'active'
	];
	
	public function type() {
		return $this->belongsTo('App\Models\Group_Type', 'group_type_id');
	}
	
	public function users() {
		return $this->hasMany('App\Models\User', 'group_id');
	}
	
	public function tutors() {
		return $this->belongsToMany('App\Models\User', 'tutor');
	}
}
