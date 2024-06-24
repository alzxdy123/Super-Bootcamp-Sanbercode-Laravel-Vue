<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieRequest;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function store(MovieRequest $request)
    {
        $newData = $request->all();

        return response()->json([
            'message' => 'Film berhasil di tambahkan',
            'data' => $newData
        ]);
    }
}
