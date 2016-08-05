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
		return $this->belongsTo('Product_Type');
	}
	
	public function groups_types() {
		return $this->belongsToMany('Group', 'permissions');
	}
}
