<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'hotels';
    protected $primaryKey = '_id';
}
