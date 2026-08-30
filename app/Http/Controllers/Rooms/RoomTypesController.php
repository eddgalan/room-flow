<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
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
}
