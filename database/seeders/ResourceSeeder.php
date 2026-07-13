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
        $descriptions = ResourceRegistry::getAllResourceDescriptions();

        foreach ($resources as $resource) {
            $permission = SpatieResource::findOrCreate($resource, self::GUARD);

            $permission
                ->forceFill([
                    'description' => $descriptions[$resource] ?? null,
                ])
                ->save();
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
