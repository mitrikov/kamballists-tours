<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'users';
    protected $primaryKey = '_id';

    protected $fillable = [
        'likes',
        'traveler_wealth',
        'traveler_type',
        'interests',
        'cuisines'
    ];

    protected $casts = [

    ];

}
