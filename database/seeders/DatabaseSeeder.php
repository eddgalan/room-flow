<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ResourceSeeder::class,
        ]);

        $adminUser = User::factory()->create([
            'username' => 'admin',
            'name' => 'Admin',
            'lastname' => 'User',
            'email' => 'admin@example.com',
        ]);
    }
}
