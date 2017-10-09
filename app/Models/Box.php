<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Box extends Model
{
    protected $table = 'categories';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'position', 'position_name', 'priority'
    ];

    protected $appends = ['position_name'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function getPositionNameAttribute($value)
    {
        return config('params.position.'.$this->position);
    }
    
    public function links(){
        return $this->hasMany("App\Models\Link", 'category_id', 'id');
    }
}
