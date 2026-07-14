<?php

use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
});
