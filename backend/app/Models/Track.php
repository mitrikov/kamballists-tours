<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Track extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'tracks';
    protected $primaryKey = '_id';
}
