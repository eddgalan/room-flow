<?php

namespace App\Authorization\Resources;

/**
 * Define all the actions, permissions, and resources available on the settings section using constants
 */
class SettingsResources implements ResourceDefinition
{
    public const string PROFILE = 'settings.profile.view';

    public const string PROFILE_UPDATE = 'settings.profile.update';

    public const string ROLES_VIEW = 'settings.roles.view';

    public const string ROLES_CREATE = 'settings.roles.create';

    public const string SECURITY = 'settings.security';

    public const string APPEARANCE = 'settings.appearance';

    /**
     * @return array<string, string>
     */
    public static function descriptions(): array
    {
        return [
            self::PROFILE => 'View profile settings.',
            self::PROFILE_UPDATE => 'Update profile settings.',
            self::ROLES_VIEW => 'View roles and permissions settings.',
            self::SECURITY => 'View and manage security settings.',
            self::APPEARANCE => 'View and manage appearance settings.',
        ];
    }
}
