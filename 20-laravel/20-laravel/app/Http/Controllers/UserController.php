<?php

namespace App\Http\Controllers;

use App\Models\User; // Importamos el modelo
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Obtener todos los usuarios de la base de datos
        $users = User::all();

        // Enviar los usuarios a la vista 'users.index'
        return view('users.index', compact('users'));
    }
}
