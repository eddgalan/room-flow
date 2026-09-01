<?php

use App\Authorization\Resources\RoomResources;
use App\Http\Controllers\Rooms\RoomController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::get('rooms', [RoomController::class, 'index'])
        ->name('rooms.index')
        ->middleware('can:'.RoomResources::LIST);
});

require __DIR__.'/rooms_rates.php';
require __DIR__.'/rooms_types.php';
