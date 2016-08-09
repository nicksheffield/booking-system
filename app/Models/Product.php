<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
	use SoftDeletes;
	
	protected $table = 'products';
	
	protected $fillable = [
		'name'
	];
	
	public function type() {
		return $this->belongsTo('App\Models\Product_Type', 'product_type_id');
	}
	
	public function groups_allowed() {
		return $this->belongsToMany('App\Models\Group', 'permissions')->withPivot('quantity');
	}
}
