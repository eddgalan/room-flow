<?php

namespace Tests\Unit;

use App\Authorization\ResourceRegistry;
use App\Authorization\Resources\DashboardResources;
use Tests\TestCase;

class ResourceRegistryTest extends TestCase
{
    public function test_it_discovers_resources_from_resource_definition_classes(): void
    {
        $resources = ResourceRegistry::getAllResources();

        $this->assertContains(DashboardResources::VIEW, $resources);
    }
}
