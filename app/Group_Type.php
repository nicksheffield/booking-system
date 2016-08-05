<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group_Type extends Model
{
	use SoftDeletes;
	
	protected $table = 'group_types';
	
	protected $fillable = [
		'name'
	];
}
