<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    public const string GUARD = 'web';

    public const string ADMIN = 'administrator';

    public const string RECEPTIONIST = 'receptionist';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultRoles = [
            self::ADMIN,
            self::RECEPTIONIST,
        ];

        foreach ($defaultRoles as $role) {
            Role::findOrCreate($role, self::GUARD);
        }
    }
}
