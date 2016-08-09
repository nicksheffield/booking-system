<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product_Type extends Model
{
	use SoftDeletes;
	
	protected $table = 'product_types';
	
	protected $fillable = [
		'name'
	];

	public function scopeStart($query) {
		return $query;
	}
	
	public function products() {
		return $this->hasMany('App\Models\Product', 'product_type_id');
	}
}
