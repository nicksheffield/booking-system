<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
	use SoftDeletes;
	
	protected $table = 'products';
	
	protected $fillable = [
		'name', 'product_type_id', 'limitless'
	];
	
	public function units() {
		return $this->hasMany('App\Models\Unit', 'product_id');
	}
	
	public function type() {
		return $this->belongsTo('App\Models\Product_Type', 'product_type_id');
	}
	
	public function group_types() {
		return $this->belongsToMany('App\Models\Group_Type', 'group_type_product', 'product_id', 'group_type_id')->withPivot('quantity', 'days_allowed');
	}
	
	public function bookings() {
		return $this->belongsToMany('App\Models\Booking', 'booking_product')->withPivot('unit_id', 'notes');
	}
	
	public function kits() {
		return $this->belongsToMany('App\Models\Kit', 'kit_product')->withPivot('id', 'quantity');
	}
}
