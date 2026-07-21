<?php

namespace App\Authorization\Resources;

/**
 * Define all the actions, permissions, and resources available on the dashboard section using constants
 */
class UserResources implements ResourceDefinition
{
    public const string VIEW = 'users.index';
    public const string CREATE = 'users.create';

    /**
     * @return array<string, string>
     */
    public static function descriptions(): array
    {
        return [
            self::VIEW => 'Show users grid.',
            self::CREATE => 'Create a new user.',
        ];
    }
}
