<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::get("{$adminPath}/users/data-table", [UserController::class, 'dataTable'])
    ->name('users.data-table');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
});
