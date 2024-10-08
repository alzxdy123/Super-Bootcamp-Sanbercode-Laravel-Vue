<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CastMovie extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'cast_movie';
    protected $fillable = ['name', 'movie_id', 'cast_id'];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }

    public function cast()
    {
        return $this->belongsTo(Cast::class);
    }
}
