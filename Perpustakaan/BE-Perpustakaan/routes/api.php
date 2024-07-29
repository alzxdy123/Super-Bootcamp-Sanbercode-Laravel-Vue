<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::get('user', [AuthController::class, 'index']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
        Route::get('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    });

});


