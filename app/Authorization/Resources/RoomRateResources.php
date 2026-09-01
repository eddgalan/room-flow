<?php

namespace App\Authorization\Resources;

class RoomRateResources implements ResourceDefinition
{
    public const string LIST = 'rooms.rates.index';

    public const string CREATE = 'rooms.rates.create';

    /**
     * @return string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'List all room rates',
            self::CREATE => 'Create a room rate',
        ];
    }
}
