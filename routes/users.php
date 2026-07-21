<?php

use App\Http\Controllers\Users\UserController;
use App\Authorization\Resources\UserResources;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::get("{$adminPath}/users/data-table", [UserController::class, 'dataTable'])
    ->name('users.data-table');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class)
        ->middlewareFor(
            'index',
            'can:'.UserResources::VIEW,
        )
        ->middlewareFor(
            'create',
            'can:'.UserResources::CREATE,
        )
        ->middlewareFor(
            'store',
            'can:'.UserResources::CREATE,
        );
});
