<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genre = Genre::where('name', 'Action')->first();

        Movie::create([
            'title' => 'Avanger',
            'summary' => 'Summary Avanger',
            'year' => 2022,
            'genre_id' => $genre->id
        ]);
}
}
