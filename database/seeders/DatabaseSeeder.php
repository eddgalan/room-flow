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
            RolesSeeder::class,
        ]);

        $adminUser = User::factory()->create([
            'username' => 'admin',
            'name' => 'Admin',
            'lastname' => 'User',
            'email' => 'admin@example.com',
        ]);

        $receptionistUser = User::factory()->create([
            'username' => 'receptionist',
            'name' => 'Receptionist',
            'lastname' => 'User',
            'email' => 'receptionist@example.com',
        ]);

        $adminUser->assignRole(RolesSeeder::ADMIN);
        $receptionistUser->assignRole(RolesSeeder::RECEPTIONIST);
    }
}
