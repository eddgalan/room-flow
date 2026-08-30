<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomTypeRequest;
use App\Models\Rooms\RoomType;
use Illuminate\Http\RedirectResponse;
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
}
