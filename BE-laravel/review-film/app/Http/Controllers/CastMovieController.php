<?php

namespace App\Http\Controllers;

use App\Models\CastMovie;
use Illuminate\Http\Request;

class CastMovieController extends Controller
{

    public function __construct() {
        $this->middleware(['auth:api', 'admin'])->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $castMovie = CastMovie::all();

        return response()->json([
            'data' => $castMovie
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'movie_id' => 'required|exists:movies,id',
            'cast_id' => 'required|exists:casts,id',
        ]);

        CastMovie::create($request->all());

        return response()->json([
            'message' => 'Cast movie berhasil ditambahkan',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $castMovie = CastMovie::with('movie', 'cast')->findOrFail($id);

        return response()->json([
            'data' => $castMovie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'movie_id' => 'required|exists:movies,id',
            'cast_id' => 'required|exists:casts,id',
        ]);

        $castMovie = CastMovie::findOrFail($id);
        $castMovie->update($request->all());

        return response()->json([
            'message' => 'Cast movie berhasil diperbarui',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $castMovie = CastMovie::findOrFail($id);
        $castMovie->delete();

        return response()->json([
            'message' => 'Cast movie berhasil dihapus',
        ]);
    }
}
