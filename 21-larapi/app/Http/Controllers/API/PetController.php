<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pets = pet::all();

        if ($pets->isEmpty()) {
            return response()->json([
                'error' => 'No pets found 🐾'
            ], 404);
        } else {
            return response()->json([
                'message' => 'Successful Query 🐈',
                'pets'  =>  $pets
            ], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name'        => ['required', 'string'],
                'kind'        => ['required', 'string'],
                'weight'      => ['required', 'decimal:1,1'], // ← corregido
                'age'         => ['required', 'integer'],
                'breed'       => ['required', 'string'],
                'location'    => ['required', 'string'],
                'description' => ['required', 'string'],
            ]);

            $pet = Pet::create($request->all());

            return response()->json([
                'message' => 'Pet was successfully added!',
                'pet' => $pet
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Error in the request',
                'errors' => $e->errors()
            ], 400);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $pet = Pet::find($request->id);
        if ($pet) {
            return response()->json([
                'message' => 'Successful Query 🐕',
                'pet'  =>  $pet
            ], 200);
        } else {
            return response()->json([
                'error' => 'Pet not found 🐾'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // 1. Buscamos la mascota por el ID de la URL
        $pet = Pet::find($id);

        // 2. Si no existe, avisamos
        if (!$pet) {
            return response()->json(['error' => 'Pet not found 🐾'], 404);
        }

        // 3. Validamos los datos (usamos 'sometimes' para que no sea obligatorio enviar todo)
        $request->validate([
            'name'        => ['sometimes', 'string'],
            'kind'        => ['sometimes', 'string'],
            'weight'      => ['sometimes', 'numeric'],
            'age'         => ['sometimes', 'integer'],
            'breed'       => ['sometimes', 'string'],
            'location'    => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
        ]);

        // 4. Actualizamos solo los campos que enviaste
        $pet->update($request->all());

        return response()->json([
            'message' => 'Pet updated successfully! ✨',
            'pet' => $pet
        ], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $pet = Pet::find($request->id);
        if ($pet) {
            if ($pet->delete()) {
                return response()->json([
                    'message' => 'Pet was successfully deleted!',
                    'pet'  =>  $pet
                ], 200);
            }
        } else {
            return response()->json([
                'error' => 'Pet not found 🐾'
            ], 404);
        }
    }
}
