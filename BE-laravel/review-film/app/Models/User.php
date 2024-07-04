<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
 
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function boot() {
        parent::boot();

        static::created(function($model) {
            $model->generateOtp();
        });
    }

    public function generateOtp() {
        do {
            $otp = rand(100000, 999999);
            $check = Otps::where('otp', $otp)->exists();
        } while ($check);

        $now = Carbon::now();
        $valid_until = $now->addMinutes(5);

        Otps::updateOrCreate(
            ['user_id' => $this->id],
            [
                'otp' => $otp,
                'valid_until' => $valid_until,
            ]
        );

        return response()->json([
            'message' => 'Otp berhasil dikirim',
            'user' => $this,
            'otp' => $otp
        ]);
    }

    public function profile() {
        return $this->hasOne(Profile::class, 'user_id');
    }
    

    public function otp_code() {
        return $this->hasOne(Otps::class, 'user_id');
    }
}
