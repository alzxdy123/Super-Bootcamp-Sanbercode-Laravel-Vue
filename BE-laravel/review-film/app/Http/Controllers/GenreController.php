<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenreRequest;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genre = Genre::all();

        return response()->json([
            "message" => "Tampil data berhasil",
            'data' => $genre
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GenreRequest $request)
    {
        Genre::create($request->all());

        return response()->json([
            'message' => 'Tambah genre berhasil'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $genre = Genre::find($id);

        if(!$genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }

        return response()->json([
            "message" => "Detail Data Genre",
            'data' => $genre
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GenreRequest $request, string $id)
    {
        $Genre = Genre::find($id);

        if(!$Genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }

        $Genre->update($request->all());

        return response()->json([
            'message' => 'Genre berhasil diupdate'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Genre = Genre::find($id);

        if(!$Genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }

        $Genre->delete();

        return response()->json([
            'message' => 'Genre berhasil dihapus'
        ], 200);
    }
}
