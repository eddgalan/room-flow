<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRateRequest;
use App\Models\Rooms\RoomRate;
use App\Support\Query\QueryBuilder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RoomRatesController extends Controller
{
    /**
     * Display a listing of the rooms.
     */
    public function index(): Response
    {
        return Inertia::render('rooms/rates/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('rooms/rates/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RoomRateRequest $request
     * @return RedirectResponse
     */
    public function store(RoomRateRequest $request): RedirectResponse
    {
        $data = $request->safe();

        try {
            DB::transaction(function () use ($data): void {
                $roomRate = RoomRate::create([
                    ...$data,
                    'enabled' => true,
                ]);
            });

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Room Rate created successfully.')]);
        } catch (\Throwable $exception) {
            Inertia::flash('toast', ['type' => 'error', 'message' => $exception->getMessage()]);
        }

        return to_route('rates.index');
    }

    /**
     * Retrieve a paginated list of room rates with metadata and links.
     *
     * @param Request $request
     * @param QueryBuilder $queryBuilder
     * @return JsonResponse
     */
    public function list(
        Request $request,
        QueryBuilder $queryBuilder
    ): JsonResponse {
        $roomRateModel = new RoomRate;
        $query = $queryBuilder->apply(
            query: RoomRate::query(),
            model: $roomRateModel,
            parameters: $request->all(),
        );

        $roomTypeQuery = $query->paginate(
            perPage: $request->integer('per_page', 15),
        )->withQueryString();

        return response()->json([
            'data' => $roomTypeQuery->through(fn (RoomRate $roomRate) => [
                'id' => $roomRate->id,
                'name' => $roomRate->name,
                'description' => $roomRate->description,
                'duration' => $roomRate->duration,
                'duration_unit' => $roomRate->duration_unit,
                'enabled' => $roomRate->enabled,
                'allow_multiple' => $roomRate->allow_multiple,
                'uses_checkin_schedule' => $roomRate->uses_checkin_schedule,
                'created_at' => $roomRate->created_at?->toDateTimeString(),
                'updated_at' => $roomRate->updated_at?->toDateTimeString(),
            ])->items(),
            'meta' => [
                'current_page' => $roomTypeQuery->currentPage(),
                'from' => $roomTypeQuery->firstItem(),
                'last_page' => $roomTypeQuery->lastPage(),
                'per_page' => $roomTypeQuery->perPage(),
                'to' => $roomTypeQuery->lastItem(),
                'total' => $roomTypeQuery->total(),
            ],
            'links' => [
                'first' => $roomTypeQuery->url(1),
                'last' => $roomTypeQuery->url($roomTypeQuery->lastPage()),
                'prev' => $roomTypeQuery->previousPageUrl(),
                'next' => $roomTypeQuery->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomRate $rate): Response
    {
        return Inertia::render('rooms/rates/edit', [
            'roomRate' => $rate,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomRateRequest $request, RoomRate $rate): RedirectResponse
    {
        $rate->update($request->safe()->all());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Room Rate updated successfully.')]);

        return to_route('rates.index');
    }
}
