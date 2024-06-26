<?php

namespace App\Http\Controllers;

use App\Http\Requests\CastRequest;
use App\Models\Cast;
use Illuminate\Http\Request;

class CastController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cast = Cast::all();

        return response()->json([
            "message" => "Tampil data berhasil",
            'data' => $cast
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CastRequest $request)
    {
        Cast::create($request->all());

        return response()->json([
            'message' => 'Tambah cast berhasil'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cast = Cast::find($id);

        if(!$cast) {
            return response()->json([
                'message' => 'Cast tidak ditemukan'
            ], 404);
        }

        return response()->json([
            "message" => "Detail Data Cast",
            'data' => $cast
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CastRequest $request, string $id)
    {
        $cast = Cast::find($id);

        if(!$cast) {
            return response()->json([
                'message' => 'Cast tidak ditemukan'
            ], 404);
        }

        $cast->update($request->all());

        return response()->json([
            'message' => 'Cast berhasil diupdate'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cast = Cast::find($id);

        if(!$cast) {
            return response()->json([
                'message' => 'Cast tidak ditemukan'
            ], 404);
        }

        $cast->delete();

        return response()->json([
            'message' => 'Cast berhasil dihapus'
        ], 200);
    }
}
