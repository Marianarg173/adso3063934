<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Carbon\Carbon;

Route::get('/', function () {
    return "This is a entry point: 😑";
    return view('welcome');
});

// URL vs URI
route::get('hello', function () {
    return "<h1>Hello folks, Have a nice day 😮 </h1>";
});

route::get('hello/{name}', function ($name) {
    return "<h1>Hello: " . request()->name . "</h1>";
});


route::get('show/pets', function () {
    $pets = App\Models\Pet::all();
    dd($pets->toArray()); // Dump & Die
});

use App\Models\Pet;

Route::get('show/pets/{id}', function ($id) {
    $pet = Pet::find($id);
    dd($pet->toArray());
});


Route::get('challenge', function () {
    $users = User::take(20)->get();
    dd($users->toArray());
});

Route::get('/challenge/users', function () {
    $users = User::limit(20)->get();

    $code = "
    <table style='border-collapse: collapse; margin: 2rem auto; font-family: Arial, sans-serif; text-align: center'>
        <tr>
            <th style='background: gray; color: white; padding: 0.5rem'>Id</th>
            <th style='background: gray; color: white; padding: 0.5rem'>Photo</th>
            <th style='background: gray; color: white; padding: 0.5rem'>Fullname</th>
            <th style='background: gray; color: white; padding: 0.5rem'>Age</th>
            <th style='background: gray; color: white; padding: 0.5rem'>Created At</th>
        </tr>
    ";

    foreach ($users as $user) {
        $photoPath = public_path($user->photo);

        if (file_exists($photoPath)) {
            $photoUrl = asset($user->photo);
        } else {
            $photoUrl = asset('photos/default.jpg');
        }

        $code .= "
        <tr>
            <td style='border: 1px solid gray; padding: 0.4rem'>{$user->id}</td>
            <td style='border: 1px solid gray; padding: 0.4rem'>
                <img src='{$photoUrl}' alt='User Photo' width='60' height='60'
                     style='border-radius: 50%; object-fit: cover'>
            </td>
            <td style='border: 1px solid gray; padding: 0.4rem'>" . e($user->fullname) . "</td>
            <td style='border: 1px solid gray; padding: 0.4rem'>" . Carbon::parse($user->birthdate)->age . " años</td>
            <td style='border: 1px solid gray; padding: 0.4rem'>" . $user->created_at->diffForHumans() . "</td>
        </tr>
        ";
    }

    $code .= "</table>";

    return $code;
});

Route::get('view/pets', function(){
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets',$pets);
});
