<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

$adminPath = config('app.admin_path');

Route::prefix($adminPath)->middleware(['auth', 'verified'])->group(function () use ($adminPath) {
    Route::redirect('/', "/{$adminPath}/dashboard")->name('admin');
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
