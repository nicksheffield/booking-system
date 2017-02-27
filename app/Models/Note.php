<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
	use SoftDeletes;

	protected $fillable = [
		'content', 'user_id'
	];

	public function user() {
		return $this->belongsTo('App\Models\User', 'user_id');
	}

	public function writer() {
		return $this->belongsTo('App\Models\User', 'writer_id');
	}

	public function versions() {
		return $this->hasMany('App\Models\Note', 'revision_of');
	}

	public function original() {
		return $this->hasOne('App\Models\Note', 'revision_of');
	}
}
