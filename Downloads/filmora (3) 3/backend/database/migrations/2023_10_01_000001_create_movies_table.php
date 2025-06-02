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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->integer('year');
            $table->string('rating')->nullable();
            $table->string('duration')->nullable();
            $table->string('director')->nullable();
            $table->string('video_url')->nullable();
            $table->string('trailer_url')->nullable();
            $table->decimal('imdb_rating', 3, 1)->nullable();
            $table->string('release_date')->nullable();
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->text('awards')->nullable();
            $table->string('box_office')->nullable();
            $table->string('production')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();
        });
        
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
        
        Schema::create('genre_movie', function (Blueprint $table) {
            $table->id();
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
            $table->foreignId('movie_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genre_movie');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('movies');
    }
};
