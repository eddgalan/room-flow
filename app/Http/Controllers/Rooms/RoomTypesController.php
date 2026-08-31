<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomTypeRequest;
use App\Models\Rooms\RoomType;
use App\Support\Query\QueryBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RoomTypesController extends Controller
{
    /**
     * Display a listing of the room types.
     */
    public function index(): Response
    {
        return Inertia::render('rooms/types/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('rooms/types/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RoomTypeRequest $request
     * @return RedirectResponse
     */
    public function store(RoomTypeRequest $request): RedirectResponse
    {
        $data = $request->safe();

        try {
            DB::transaction(function () use ($data): void {
                $roomType = RoomType::create([
                    ...$data,
                    'enabled' => true,
                ]);
            });

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Room Type created successfully.')]);
        } catch (\Throwable $exception) {
            Inertia::flash('toast', ['type' => 'error', 'message' => $exception->getMessage()]);
        }

        return to_route('types.index');
    }

    /**
     * Generate a paginated data table response for users.
     *
     * This function applies query modifications based on the provided
     * request parameters and query builder, fetches paginated results,
     * and formats them into a JSON response including metadata and pagination links.
     */
    public function list(
        Request $request,
        QueryBuilder $queryBuilder
    ): JsonResponse {
        $roomTypeModel = new RoomType;
        $query = $queryBuilder->apply(
            query: RoomType::query(),
            model: $roomTypeModel,
            parameters: $request->all(),
        );

        $roomTypes = $query->paginate(
            perPage: $request->integer('per_page', 15),
        )->withQueryString();

        return response()->json([
            'data' => $roomTypes->through(fn (RoomType $roomType) => [
                'id' => $roomType->id,
                'name' => $roomType->name,
                'description' => $roomType->description,
                'capacity' => $roomType->capacity,
                'enabled' => $roomType->enabled,
                'created_at' => $roomType->created_at?->toDateTimeString(),
                'updated_at' => $roomType->updated_at?->toDateTimeString(),
            ])->items(),
            'meta' => [
                'current_page' => $roomTypes->currentPage(),
                'from' => $roomTypes->firstItem(),
                'last_page' => $roomTypes->lastPage(),
                'per_page' => $roomTypes->perPage(),
                'to' => $roomTypes->lastItem(),
                'total' => $roomTypes->total(),
            ],
            'links' => [
                'first' => $roomTypes->url(1),
                'last' => $roomTypes->url($roomTypes->lastPage()),
                'prev' => $roomTypes->previousPageUrl(),
                'next' => $roomTypes->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomType $type): Response
    {
        return Inertia::render('rooms/types/edit', [
            'roomType' => $type,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomTypeRequest $request, RoomType $type): RedirectResponse
    {
        $type->update($request->safe()->all());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Room Type updated successfully.')]);

        return to_route('types.index');
    }

    /**
     * Toggle the enabled status of the specified resource.
     */
    public function toggleEnabled(RoomType $type): RedirectResponse
    {
        try {
            $type->enabled = ! $type->enabled;
            $type->save();

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Room Type enabled successfully.')]);
        } catch (\Throwable $exception) {
            Inertia::flash('toast', ['type' => 'error', 'message' => $exception->getMessage()]);
        }

        return to_route('types.index');
    }
}
