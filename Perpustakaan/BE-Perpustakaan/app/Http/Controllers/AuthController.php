<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function index() {
        $users = User::all();

        return response()->json(['data' => $users], 200);
    }

    public function register(UserRequest $request) {
        $userRole = Role::where('name', 'user')->first();

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'password_confirmation' => $request->password_confirmation,
            'role_id' => $userRole->id
        ]);

        return response()->json(['data' => $user], 201);
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        if(!auth()->attempt($credentials)) {
            return response()->json(['message' => 'The credentials you entered are incorrect || Kredensial yang anda masukkan salah'], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token], 200);
    }

    public function me() {
        $authUser = auth()->user();

        $user = User::with('role:id,name')->find($authUser->id);

        return response()->json(['data' => $user], 200);
    }

    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out || Logout berhasil'], 200);
    }
}
