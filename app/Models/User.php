<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password', 'user_type', 'user_type_name', 'status', 'status_name'
    ];

    protected $appends = ['user_type_name', 'status_name'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'raw_password'
    ];
    public $rawPassword = '';

    public function setPasswordAttribute($value)
    {
        $this->rawPassword = $value;
        $this->attributes['password'] = bcrypt($value);
    }

    public function getUserTypeNameAttribute($value)
    {
        return config('params.user_type.'.$this->user_type);
    }

    public function getStatusNameAttribute($value)
    {
        return config('params.status.'.$this->status);
    }
}
