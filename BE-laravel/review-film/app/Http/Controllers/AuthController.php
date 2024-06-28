<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userRole = Role::where('name', 'user')->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $userRole->id
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    public function getUser()
    {
        $user = auth()->user();

        return response()->json([
            'data' => $user]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$user = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $userData = User::where('email', $request->email)->first();

        $token = JWTAuth::fromUser($userData);

        return response()->json([
            'data' => $userData,
            'token' => $token
        ]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Logout berhasil']);
    }

    public function update(Request $request) {

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $currentUser = auth()->user()->name;
        $user = User::where('name', $currentUser)->first();
        $user->update($request->all());

        return response()->json([
            'message' => 'Profile berhasil di perbahui',
        ]);
    }
}
