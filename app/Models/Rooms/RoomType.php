<?php

namespace App\Models\Rooms;

use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'capacity',
        'enabled',
        'created_at',
        'updated_at',
    ];
}
