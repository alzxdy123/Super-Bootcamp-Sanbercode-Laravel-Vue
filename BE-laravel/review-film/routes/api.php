<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('v1')->group(function () {
    Route::apiResource('movie', MovieController::class);
    Route::apiResource('cast', CastController::class);
    Route::apiResource('genre', GenreController::class);

    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
        Route::post('update-user', [AuthController::class, 'update'])->middleware('auth:api');
        Route::get('me', [AuthController::class, 'getUser'])->middleware('auth:api');
    });
});
