<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
	use SoftDeletes;
	
	protected $table = 'groups';
	
	protected $fillable = [
		'code'
	];
	
	public function type() {
		return $this->belongsTo('Group_Type');
	}
	
	public function users() {
		return $this->hasMany('User');
	}
}
