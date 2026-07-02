<?php

namespace Database\Seeders\Resources;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission as SpatieResource;
use App\Authorization\DashboardResources;

class DashboardResourceSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run(): void
    {
        $resources = [
            DashboardResources::VIEW,
        ];

        foreach ($resources as $resource) {
            SpatieResource::firstOrCreate([
                'name' => $resource,
                'guard_name' => 'web',
            ]);
        }
    }
}
