<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Support\Query\QueryBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('users/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $roles = Role::where('guard_name', 'web')->get()->toArray();

        return Inertia::render('users/create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        User::create([
            ...$request->safe()->except('password_confirmation'),
            'enabled' => true,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('User created successfully.')]);

        return to_route('users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        $roles = Role::where('guard_name', 'web')->get()->toArray();
        $user = User::query()
            ->select([
                'users.id',
                'users.name',
                'users.lastname',
                'users.username',
                'users.enabled',
                'users.email',
                'users.phone_number',
                'users.created_at',
                'users.updated_at',
                'roles.id as role_id',
                'roles.name as role_name',
            ])
            ->leftJoin('model_has_roles', function ($join): void {
                $join
                    ->on('users.id', '=', 'model_has_roles.model_id')
                    ->where('model_has_roles.model_type', User::class);
            })
            ->leftJoin('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('users.id', $user->id)
            ->firstOrFail();

        return Inertia::render('users/edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $data = $request->safe()->except('password_confirmation');
        $roleId = $data['role_id'] ?? null;
        unset($data['role_id']);

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        }

        $user->update($data);

        if ($roleId) {
            $user->syncRoles([(int) $roleId]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('User updated successfully.')]);

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user->username === 'admin') {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('The administrator user cannot be deleted.')]);

            return back();
        }

        $user->syncRoles([]);
        $user->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('User deleted successfully.')]);

        return to_route('users.index');
    }

    /**
     * Generate a paginated data table response for users.
     *
     * This function applies query modifications based on the provided
     * request parameters and query builder, fetches paginated results,
     * and formats them into a JSON response including metadata and pagination links.
     *
     * @param Request $request
     * @param QueryBuilder $queryBuilder
     *
     * @return JsonResponse
     */
    public function dataTable(
        Request $request,
        QueryBuilder $queryBuilder
    ): JsonResponse {
        $user = new User;
        $query = $queryBuilder->apply(
            query: User::query(),
            model: $user,
            parameters: $request->all(),
        );

        $users = $query->paginate(
            perPage: $request->integer('per_page', 15),
        )->withQueryString();

        return response()->json([
            'data' => $users->through(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'lastname' => $user->lastname,
                'username' => $user->username,
                'enabled' => $user->enabled,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'created_at' => $user->created_at?->toDateTimeString(),
                'updated_at' => $user->updated_at?->toDateTimeString(),
            ])->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'from' => $users->firstItem(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'to' => $users->lastItem(),
                'total' => $users->total(),
            ],
            'links' => [
                'first' => $users->url(1),
                'last' => $users->url($users->lastPage()),
                'prev' => $users->previousPageUrl(),
                'next' => $users->nextPageUrl(),
            ],
        ]);
    }
}
