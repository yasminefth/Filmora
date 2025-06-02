<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Get all movies with pagination
     */
    public function index(Request $request)
    {
        $query = Movie::with(['genres']);
        
        // Filter by genre if provided
        if ($request->has('genre')) {
            $query->whereHas('genres', function($q) use ($request) {
                $q->where('name', $request->genre);
            });
        }
        
        // Search by title if provided
        if ($request->has('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }
        
        $movies = $query->paginate(12);
        
        return response()->json($movies);
    }
    
    /**
     * Get a specific movie with related data
     */
    public function show($id)
    {
        $movie = Movie::with(['genres', 'actors', 'comments.user'])
            ->findOrFail($id);
            
        return response()->json([
        'success' => true,
        'data' => $movie
    ]);
    }
    
    /**
     * Get trending movies
     */
    public function trending()
    {
        $movies = Movie::with(['genres'])
            ->orderBy('views', 'desc')
            ->take(8)
            ->get();
            
        return response()->json($movies);
    }
    
    /**
     * Get popular movies
     */
    public function popular()
    {
        $movies = Movie::with(['genres'])
            ->orderBy('imdb_rating', 'desc')
            ->take(8)
            ->get();
            
        return response()->json($movies);
    }

    /**
     * Get related movies by genre (or any logic you want)
     */
    public function related($id)
    {
        $movie = Movie::with('genres')->findOrFail($id);

        // Get the first genre of the movie (or all genres)
        $genreIds = $movie->genres->pluck('id');

        // Find other movies with the same genre(s), excluding the current movie
        $related = Movie::with('genres')
            ->whereHas('genres', function($q) use ($genreIds) {
                $q->whereIn('id', $genreIds);
            })
            ->where('id', '!=', $movie->id)
            ->take(8)
            ->get();

        return response()->json($related);
    }
}
