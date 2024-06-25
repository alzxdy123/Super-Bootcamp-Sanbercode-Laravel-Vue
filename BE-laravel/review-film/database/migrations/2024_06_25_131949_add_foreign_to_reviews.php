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
        Schema::table('reviews', function (Blueprint $table) {
            $table->uuid('user_id')->after('rating');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->uuid('movie_id')->after('rating');
            $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['movie_id']);
            $table->dropColumn('user_id');
            $table->dropColumn('movie_id');

        });
    }
};
