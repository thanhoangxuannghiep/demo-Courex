<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $table = 'links';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'title', 'logo', 'url', 'is_follow', 'category_id', 'enable'
    ];

    // protected $appends = ['position_name'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function category(){
        return $this->hasOne("App\Models\Box", 'id', 'category_id');
    }
}
