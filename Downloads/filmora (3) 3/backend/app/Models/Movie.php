<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'image',
        'year', 
        'rating', 
        'duration',
        'director',
        'video_url',
        'trailer_url',
        'imdb_rating',
        'release_date',
        'language',
        'country',
        'awards',
        'box_office',
        'production'
    ];

    /**
     * The genres that belong to the movie.
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    /**
     * The actors that belong to the movie.
     */
    public function actors(): BelongsToMany
    {
        return $this->belongsToMany(Actor::class)->withPivot('character');
    }

    /**
     * The comments that belong to the movie.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
