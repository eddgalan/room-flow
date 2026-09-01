<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
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
}
