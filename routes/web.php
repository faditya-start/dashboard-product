<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ReportController;
use Inertia\Inertia;

// Guest routes
Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    });

    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login.index');
});

// Protected routes
Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('home');

    // Product routes
    Route::resource('products', ProductController::class);

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});
