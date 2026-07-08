<?php

namespace Database\Seeders;

use App\Authorization\ResourceRegistry;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as SpatieResource;
use Spatie\Permission\PermissionRegistrar;

class ResourceSeeder extends Seeder
{
    private const string GUARD = 'web';

    /**
     * @return void
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $resources = ResourceRegistry::getAllResources();

        foreach ($resources as $resource) {
            SpatieResource::findOrCreate($resource, self::GUARD);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
