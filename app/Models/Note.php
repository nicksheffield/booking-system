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
}
