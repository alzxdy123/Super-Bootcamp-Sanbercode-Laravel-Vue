<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'age' => 'required|integer',
            'bio' => 'required|string',
            'address' => 'required|string'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $currentUser = auth()->user();

        $profileData = Profile::updateOrCreate(
            [
                'user_id' => $currentUser->id
            ],
            [
                'age' => $request['age'],
                'bio' => $request['bio'],
                'address' => $request['address'],
                'user_id' => $currentUser->id
            ]
        );
    
        return response()->json([
            'data' => $profileData
        ]);
    }
    

    public function show()
    {
        $currentUser = auth()->user();

        $profile = Profile::with('user')->where('user_id', $currentUser->id)->first();

        return response()->json([
            'data' => $profile
        ]);
    }    
}
