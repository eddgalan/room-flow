<?php

use App\Authorization\Resources\RoomTypeResources;
use App\Http\Controllers\Rooms\RoomTypesController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::get('rooms/types/list', [RoomTypesController::class, 'list'])
        ->name('rooms.types.list')
        ->middleware('can:'.RoomTypeResources::LIST);

    Route::resource('rooms/types', RoomTypesController::class)
        ->except(['show'])
        ->middlewareFor(
            'index',
            'can:'.RoomTypeResources::LIST,
        )
        ->middlewareFor(
            'create',
            'can:'.RoomTypeResources::CREATE,
        )
        ->middlewareFor(
            'store',
            'can:'.RoomTypeResources::CREATE,
        )
        ->middlewareFor(
            'edit',
            'can:'.RoomTypeResources::EDIT,
        )
        ->middlewareFor(
            'update',
            'can:'.RoomTypeResources::EDIT,
        );

    Route::get('rooms/types/{type}/toggle-enabled', [RoomTypesController::class, 'toggleEnabled'])
        ->name('rooms.types.toggleEnabled')
        ->middleware('can:'.RoomTypeResources::TOGGLE_ENABLED);
});
