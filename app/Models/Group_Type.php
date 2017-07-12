<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group_Type extends Model
{
	use SoftDeletes;
	
	protected $table = 'group_types';
	
	protected $fillable = [
		'code', 'name', 'group_type_id'
	];
	
	public function groups() {
		return $this->hasMany('App\Models\Group', 'group_type_id');
	}
	
	public function products() {
		return $this->belongsToMany('App\Models\Product', 'group_type_product', 'group_type_id', 'product_id')->withPivot('quantity', 'days_allowed');
	}
}
