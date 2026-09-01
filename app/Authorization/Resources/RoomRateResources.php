<?php

namespace App\Authorization\Resources;

class RoomRateResources implements ResourceDefinition
{
    public const string LIST = 'rooms.rates.index';

    /**
     * @return string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'List all room rates',
        ];
    }
}
