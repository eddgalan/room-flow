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
    public const string SECURITY = 'settings.security';
    public const string APPEARANCE = 'settings.appearance';
}
