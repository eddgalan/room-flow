<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRateRequest;
use App\Models\Rooms\RoomRate;
use Illuminate\Http\RedirectResponse;
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
}
