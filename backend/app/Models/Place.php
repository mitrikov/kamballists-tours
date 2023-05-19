<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Place extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'places';
    protected $primaryKey = '_id';
}
