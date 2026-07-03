<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\Resources\DashboardResourceSeeder;

class ResourceSeeder extends Seeder
{
    /**
     * @return void
     */
    public function run(): void
    {
        $this->call([
            DashboardResourceSeeder::class,
        ]);
    }
}
