<?php

use App\Authorization\Resources\RoomResources;
use App\Authorization\Resources\RoomTypeResources;
use App\Http\Controllers\Rooms\RoomController;
use App\Http\Controllers\Rooms\RoomTypesController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::get('rooms', [RoomController::class, 'index'])
        ->name('rooms.index')
        ->middleware('can:'.RoomResources::LIST);

    Route::get('rooms/types', [RoomTypesController::class, 'index'])
        ->name('rooms.types.index')
        ->middleware('can:'.RoomTypeResources::LIST);
});
