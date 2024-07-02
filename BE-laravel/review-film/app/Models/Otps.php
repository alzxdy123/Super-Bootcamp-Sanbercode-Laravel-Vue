<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otps extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'otps';

    protected $fillable = ['otp', 'valid_until', 'user_id'];
}
