<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Display a listing of the rooms.
     */
    public function index(): Response
    {
        return Inertia::render('rooms/index');
    }
}
