<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Carbon\Carbon;

class Kit extends Model
{
	use SoftDeletes;
	
	protected $table = 'kits';
	
	protected $fillable = [
		'name'
	];

	public function products() {
		return $this->belongsToMany('App\Models\Product', 'kit_product')->withPivot('id', 'quantity');
	}
}
