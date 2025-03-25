<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
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

    // Product routes with permissions
    Route::middleware(['permission:view-products'])->group(function () {
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
    });

    Route::middleware(['permission:create-products'])->group(function () {
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    });

    Route::middleware(['permission:edit-products'])->group(function () {
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    });

    Route::middleware(['permission:delete-products'])->group(function () {
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    });

    // Reports route with permission
    Route::middleware(['permission:view-reports'])->group(function () {
        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    });

    // User Management Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
        
        // User Role Management Routes
        Route::post('/users/{user}/assign-role', [UserController::class, 'assignRole'])->name('users.assign-role');
        Route::delete('/users/{user}/remove-role', [UserController::class, 'removeRole'])->name('users.remove-role');
    });

    // Role Management Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
        Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
        Route::get('/roles/{role}', [RoleController::class, 'show'])->name('roles.show');
        Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
        Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
        
        // Role Permission Management Routes
        Route::post('/roles/{role}/assign-permission', [RoleController::class, 'assignPermission'])->name('roles.assign-permission');
        Route::delete('/roles/{role}/remove-permission', [RoleController::class, 'removePermission'])->name('roles.remove-permission');
    });

    // Admin only routes
    Route::middleware(['role:admin'])->group(function () {
        // Add admin-specific routes here
    });
});
