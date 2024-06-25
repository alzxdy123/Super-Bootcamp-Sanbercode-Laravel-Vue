<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cast_movie', function (Blueprint $table) {
            $table->uuid('cast_id')->after('name');
            $table->foreign('cast_id')->references('id')->on('casts')->onDelete('cascade');
            $table->uuid('movie_id')->after('name');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cast_movie', function (Blueprint $table) {
            $table->dropForeign(['cast_id']);
            $table->dropColumn('cast_id');
            $table->dropForeign(['movie_id']);
            $table->dropColumn('movie_id');
        });
    }
};
