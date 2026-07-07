<?php

namespace App\Authorization\Resources;

/**
 * Define all the actions, permissions, and resources available on the dashboard section using constants
 */
class DashboardResources implements ResourceDefinition
{
    public const string VIEW = 'dashboard.view';
}
