<?php

namespace App\Authorization\Resources;

class RoomTypeResources implements ResourceDefinition
{
    public const string LIST = 'rooms.types.index';

    public const string CREATE = 'rooms.types.create';

    public const string EDIT = 'rooms.types.edit';

    public const string TOGGLE_ENABLED = 'rooms.types.enabled';

    /**
     * @return array|string[]
     */
    public static function descriptions(): array
    {
        return [
            self::LIST => 'Show room types list (grid).',
            self::CREATE => 'Create a new room type.',
            self::EDIT => 'Edit a room type.',
            self::TOGGLE_ENABLED => 'Enabled/Disabled room type.',
        ];
    }
}
