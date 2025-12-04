<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $adoptions = Adoption::orderBy('id', 'DESC')->paginate(20);
        return view('adoptions.index', compact('adoptions'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $adoption = Adoption::find($request->id);
        return view('adoptions.show')->with('adoption', $adoption);
    }
}
