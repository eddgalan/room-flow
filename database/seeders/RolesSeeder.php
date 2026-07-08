<?php

namespace Database\Seeders;

use App\Authorization\ResourceRegistry;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Contracts\Role as RoleContract;

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
            $role = Role::findOrCreate($role, self::GUARD);

            if ($role->name === self::ADMIN) {
                $this->assignAllResourcesToAdminRole($role);
            }
        }
    }

    /**
     * Assign all available resources to the admin role.
     *
     * @param RoleContract $adminRole
     * @return void
     */
    private function assignAllResourcesToAdminRole(RoleContract $adminRole): void
    {
        $resources = ResourceRegistry::getAllResources();
        foreach ($resources as $resource) {
            $adminRole->givePermissionTo($resource);
        }
    }
}
