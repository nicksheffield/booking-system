<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group_Type extends Model
{
	use SoftDeletes;
	
	protected $table = 'group_types';
	
	protected $fillable = [
		'name', 'group_type_id'
	];

	public function scopeStart($query) {
		return $query;
	}
	
	public function groups() {
		return $this->hasMany('App\Models\Group', 'group_type_id');
	}
}
