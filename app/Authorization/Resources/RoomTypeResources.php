<?php

namespace App\Authorization\Resources;

class RoomTypeResources implements ResourceDefinition
{
    public const string LIST = 'rooms.types.index';

    public const string CREATE = 'rooms.types.create';

    /**
     * @return array|string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'Show room types list (grid).',
            self::CREATE => 'Create a new room type.',
        ];
    }
}
