<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TuteController;
use App\Http\Controllers\Api\PaperController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Tute කළමනාකරණය සඳහා Endpoints
Route::get('/tutes', [TuteController::class, 'index']);
Route::post('/tutes', [TuteController::class, 'store']);
Route::delete('/tutes/{id}', [TuteController::class, 'destroy']);

// Paper කළමනාකරණය සඳහා Endpoints
Route::get('/papers', [PaperController::class, 'index']);
Route::post('/papers', [PaperController::class, 'store']);
Route::delete('/papers/{id}', [PaperController::class, 'destroy']);