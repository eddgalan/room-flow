<?php

namespace App\Models\Rooms;

use App\Contracts\HasQuery;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property int $duration
 * @property string $duration_unit
 * @property bool $enabled
 * @property bool $allow_multiple
 * @property bool $uses_checkin_schedule
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class RoomRate extends Model implements HasQuery
{
    public const string HOURS = 'hours';

    public const string MINUTES = 'minutes';

    public const string DAYS = 'days';

    protected $fillable = [
        'name',
        'description',
        'duration',
        'duration_unit',
        'enabled',
        'allow_multiple',
        'uses_checkin_schedule',
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
            'duration' => 'integer',
            'duration_unit' => 'string',
            'enabled' => 'bool',
            'allow_multiple' => 'bool',
            'uses_checkin_schedule' => 'bool',
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
            'duration',
            'duration_unit',
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
        ];
    }
}
