<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{   
    use HasFactory, HasUuids;

    protected $table = 'profile_user';

    protected $primaryKey = 'id';

    protected $fillable = ['age', 'bio', 'address', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
