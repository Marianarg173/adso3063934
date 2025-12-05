<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AdoptionController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::group(['middleware' => 'admin'], function () {
        Route::resources([
            'users' => UserController::class,
            'pets'  => PetController::class,

        ]);

        // ADOPTIONS
        Route::get('adoptions', [AdoptionController::class, 'index']);
        Route::get('adoptions/{id}', [AdoptionController::class, 'show']);

        // SEARCH - SOLO 1 CORRECTA
        Route::post('search/adoptions', [AdoptionController::class, 'search'])->name('adoptions.search');

        // EXPORTS
        Route::get('export/adoptions/pdf', [AdoptionController::class, 'pdf']);
        Route::get('export/adoptions/excel', [AdoptionController::class, 'excel']);

        // DEMO ROUTES
        Route::get('hello', function () {
            return "<h1>Hello folks, Have a nice day 😍</h1>";
        });

        Route::get('hello/{name}', function () {
            return "<h1>Hello: " . request()->name . "</h1>";
        });

        Route::get('show/pets', function () {
            $pets = App\Models\Pet::all();
            dd($pets->toArray());
        });

        Route::get('show/pet/{id}', function () {
            $pet = App\Models\Pet::find(request()->id);
            dd($pet->toArray());
        });

        // USERS SEARCH
        Route::post('search/users', [UserController::class, 'search']);

        // USERS EXPORT
        Route::get('export/users/pdf', [UserController::class, 'pdf']);
        Route::get('export/users/excel', [UserController::class, 'excel']);

        // USERS IMPORT
        Route::post('import/users/excel', [UserController::class, 'import']);

        // PETS SEARCH
        Route::post('search/pets', [PetController::class, 'search']);

        // PETS EXPORT
        Route::get('export/pets/pdf', [PetController::class, 'pdf']);
        Route::get('export/pets/excel', [PetController::class, 'excel']);

        // PETS IMPORT
        Route::post('import/pets/excel', [PetController::class, 'import']);
    });
});
require __DIR__ . '/auth.php';
