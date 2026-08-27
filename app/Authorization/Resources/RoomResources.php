<?php

namespace App\Authorization\Resources;

class RoomResources implements ResourceDefinition
{
    public const string LIST = 'rooms.index';

    /**
     * @return array|string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'Show rooms list (grid).',
        ];
    }
}
