<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Requests\MovieRequest;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movie = Movie::all();

        return response()->json([
            'message' => 'Tampil data berhasil',
            'data' => $movie
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MovieRequest $request)
    {
        $movie = $request->validated();

        if ($request->hasFile('poster')) {
            $posterName = time().'.'.$request->poster->extension();
            $request->poster->storeAs('public/images', $posterName);
            $poster = env('APP_URL').'/storage/images/'.$posterName;
            $movie['poster'] = $poster;
        }
        
        Movie::create($movie);

        return response()->json([
            'message' => 'Movie berhasil ditambahkan',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::find($id);

        if(!$movie) {
            return response()->json([
                'message' => 'Movie tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'message' => 'Detail Data Movie',
            'data' => $movie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MovieRequest $request, string $id)
    {
        $data = $request->validated();

        $newData = Movie::find($id);
        if(!$newData) {
            return response()->json([
                'message' => 'Movie tidak ditemukan'
            ], 404);
        }
    
        if ($request->hasFile('poster')) {
            if ($newData->poster) {
                $namaPoster = basename($newData->poster);
                Storage::delete('public/images/'. $namaPoster);
            }
            $posterName = time().'.'.$request->poster->extension();
            $request->poster->storeAs('public/images', $posterName);
            $poster = env('APP_URL').'/storage/images/'.$posterName;

            $data['poster'] = $poster;
        }

        $newData->update($data);
    
        return response()->json([
            'message' => 'Movie berhasil diperbarui',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::find($id);

        if(!$movie) {
            return response()->json([
                'message' => 'Movie tidak ditemukan'
            ], 404);
        }

        if($movie->poster) {
            $namaPoster = basename($movie->poster);
            Storage::delete('public/images/'. $namaPoster);
        }

        $movie->delete();

        return response()->json([
            'message' => 'Movie berhasil dihapus',
        ]);
    }
}
