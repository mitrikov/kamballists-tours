<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Excursion extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'excursions';
    protected $primaryKey = '_id';
}
