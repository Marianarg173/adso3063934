<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\AuthController;



// Endpoint: http://127.0.0.1:8000/api/login
Route::post('login', [AuthController::class, 'login']);


// --- RUTAS PROTEGIDAS (Requieren Token Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    // Endpoint: http://127.0.0.1:8000/api/logout
    Route::post('logout', [AuthController::class, 'logout']);

    // Pets
    // Endpoint: http://127.0.0.1:8000/api/pets/list
    Route::get('pets/list', [PetController::class, 'index']);

    // Endpoint: http://127.0.0.1:8000/api/pets/show/{id}
    Route::get('pets/show/{id}', [PetController::class, 'show']);

    // Endpoint: http://127.0.0.1:8000/api/pets/store
    Route::post('pets/store', [PetController::class, 'store']);

    // Endpoint: http://127.0.0.1:8000/api/pets/edit/{id}
    Route::put('pets/edit/{id}', [PetController::class, 'update']);

    // Endpoint: http://127.0.0.1:8000/api/pets/delete/{id}
    Route::delete('pets/delete/{id}', [PetController::class, 'destroy']);
});
