<?php

namespace App\Authorization\Resources;

class RoomTypeResources implements ResourceDefinition
{
    public const string LIST = 'rooms.types.index';

    /**
     * @return array|string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'Show room types list (grid).',
        ];
    }
}
