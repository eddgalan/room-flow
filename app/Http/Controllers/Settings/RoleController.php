<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StoreRoleRequest;
use Database\Seeders\RolesSeeder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $roles = [];
        foreach (Role::all() as $role) {
            $roles[] = [
                'id' => $role->id,
                'name' => $role->name,
                'edit_url' => route('settings.roles.edit', $role->id),
            ];
        }

        return Inertia::render('settings/roles/index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $resources = Permission::all();

        return Inertia::render('settings/roles/create', ['resources' => $resources]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $role = Role::create([
            ...$request->validated(),
            'guard_name' => 'web',
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Role created.')]);

        return to_route('settings.roles.edit', $role);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        $resources = Permission::all();

        $resourcesInRole = $role->permissions;

        return Inertia::render('settings/roles/edit', [
            'resources' => $resources,
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'resources' => $resourcesInRole,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRoleRequest $request, Role $role): RedirectResponse
    {
        $role->update($request->validated());

        $resources = $request->resources;
        $role->syncPermissions($resources);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Role updated.')]);

        return to_route('settings.roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name === RolesSeeder::ADMIN) {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('The administrator role cannot be deleted.')]);

            return back();
        }

        $role->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Role deleted.')]);

        return to_route('settings.roles.index');
    }
}
