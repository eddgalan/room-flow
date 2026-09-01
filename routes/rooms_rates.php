<?php

use App\Authorization\Resources\RoomRateResources;
use App\Http\Controllers\Rooms\RoomRatesController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::resource('rooms/rates', RoomRatesController::class)
        ->except(['show'])
        ->middlewareFor(
            'index',
            'can:'.RoomRateResources::LIST
        )
        ->middlewareFor(
            'create',
            'can:'.RoomRateResources::CREATE
        );

    Route::get('rooms/rates/list', [RoomRatesController::class, 'list'])
        ->name('rooms.rates.list')
        ->middleware('can:'.RoomRateResources::LIST);
});
