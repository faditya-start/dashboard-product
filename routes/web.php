<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;

// Guest routes
Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('home');

    // Product routes
    Route::resource('products', ProductController::class);
});
