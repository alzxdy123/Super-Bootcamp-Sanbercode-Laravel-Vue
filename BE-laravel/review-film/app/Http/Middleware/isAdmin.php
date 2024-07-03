<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Role;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $admin = Role::where('name', 'admin')->first();
        
        if ($user->role_id !== $admin->id) {
            return response()->json([
                'message' => 'Hanya bisa di akses oleh admin',
            ], 401);
        }

        return $next($request);
    }
}
