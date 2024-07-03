<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'rating' => 'required|numeric|min:0|max:5',
            'critic' => 'required'
        ]);

        $currentUser = auth()->user();

        Review::updateOrCreate(
            ['user_id' => $currentUser->id],
            [
                'movie_id' => $request->movie_id,
                'rating' => $request->rating,
                'critic' => $request->critic,
                'user_id' => $currentUser->id
            ]
    );

        return response()->json([
            'message' => 'Review berhasil ditambahkan!'
        ]);
    }

    public function show() {
        $reviews = Review::all();
        return response()->json([
            'data' => $reviews
        ]);
    }
}
