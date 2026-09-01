<?php

namespace App\Authorization\Resources;

class RoomRateResources implements ResourceDefinition
{
    public const string LIST = 'rooms.rates.index';

    public const string CREATE = 'rooms.rates.create';

    public const string EDIT = 'rooms.rates.edit';

    public const string TOGGLE_ENABLED = 'rooms.rates.enabled';

    /**
     * @return string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'List all room rates',
            self::CREATE => 'Create a room rate',
            self::EDIT => 'Edit Form and Update a room rate',
            self::TOGGLE_ENABLED => 'Enabled/Disabled room rate.',
        ];
    }
}
