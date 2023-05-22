<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'restaurants';
    protected $primaryKey = '_id';
}
