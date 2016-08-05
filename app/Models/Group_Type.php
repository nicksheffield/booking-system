<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group_Type extends Model
{
	use SoftDeletes;
	
	protected $table = 'group_types';
	
	protected $fillable = [
		'name'
	];
	
	public function groups() {
		return $this->hasMany('Group');
	}
	
	public function allowed_products() {
		return $this->belongsToMany('Product', 'permissions');
	}
}
