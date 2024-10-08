<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\CastMovieController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;

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
    Route::apiResource('role', RoleController::class)->middleware(['auth:api','admin']);
    Route::apiResource('cast-movie', CastMovieController::class);

    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::get('logout', [AuthController::class, 'logout'])->middleware('auth:api');
        Route::post('update-user', [AuthController::class, 'update'])->middleware(['auth:api', 'accVerified']);
        Route::post('generate-otp', [AuthController::class, 'generateOtp'])->middleware('auth:api');
        Route::post('verifikasi', [AuthController::class, 'verfikasi'])->middleware('auth:api');
        Route::get('me', [AuthController::class, 'getUser'])->middleware(['auth:api']);
    });

    Route::post('profile', [ProfileController::class, 'store'])->middleware(['auth:api', 'accVerified']);
    Route::get('profile', [ProfileController::class, 'show'])->middleware(['auth:api', 'accVerified']);
    Route::post('review', [ReviewController::class, 'store'])->middleware(['auth:api', 'accVerified']);
    Route::get('review', [ReviewController::class, 'show'])->middleware(['auth:api', 'accVerified']);
});
