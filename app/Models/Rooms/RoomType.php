<?php

namespace App\Models\Rooms;

use App\Contracts\HasQuery;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $capacity
 * @property bool $enabled
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class RoomType extends Model implements HasQuery
{
    protected $fillable = [
        'name',
        'description',
        'capacity',
        'enabled',
        'created_at',
        'updated_at',
    ];

    /**
     * @return string[]
     */
    public function getFilterableFields(): array
    {
        return [
            'id' => 'integer',
            'name' => 'string',
            'description' => 'string',
            'capacity' => 'integer',
            'enabled' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * @return string[]
     */
    public function getSortableFields(): array
    {
        return [
            'id',
            'name',
            'description',
            'capacity',
        ];
    }

    /**
     * @return string[]
     */
    public function getSearchableFields(): array
    {
        return [
            'id',
            'name',
            'description',
            'capacity',
        ];
    }
}
