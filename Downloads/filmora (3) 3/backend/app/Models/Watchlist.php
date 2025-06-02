<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Watchlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'watchable_type',
        'watchable_id',
        'added_at'
    ];

    protected $casts = [
        'added_at' => 'datetime',
    ];

    /**
     * Get the user that owns the watchlist item.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the watchable model (movie or series).
     */
    public function watchable(): MorphTo
    {
        return $this->morphTo();
    }
}
