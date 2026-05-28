<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TuteController;
use App\Http\Controllers\Api\PaperController;
use App\Http\Controllers\QuizController;

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

Route::prefix('quizzes')->group(function () {
    Route::post('/create', [QuizController::class, 'store']);       // Quiz එකක් සාදන්න
    Route::get('/grade/{grade}', [QuizController::class, 'getByGrade']); // Grade එක අනුව ගන්න
    Route::post('/{id}/submit', [QuizController::class, 'submit']);   // Answers Submit කර ලකුණු ගන්න
    Route::delete('/{id}', [QuizController::class, 'destroy']);     // Quiz එක Delete කරන්න
});