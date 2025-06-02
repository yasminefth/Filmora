<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    /**
     * Get user's watchlist
     */
    public function index(Request $request)
    {
        $watchlist = $request->user()->watchlist()->with(['watchable'])->get();
        
        return response()->json($watchlist);
    }
    
    /**
     * Add item to watchlist
     */
    public function store(Request $request)
    {
        $request->validate([
            'watchable_type' => 'required|in:App\\Models\\Movie,App\\Models\\Series',
            'watchable_id' => 'required|integer',
        ]);
        
        $watchlist = $request->user()->watchlist()->updateOrCreate(
            [
                'watchable_type' => $request->watchable_type,
                'watchable_id' => $request->watchable_id,
            ],
            [
                'added_at' => now(),
            ]
        );
        
        return response()->json([
            'message' => 'Added to watchlist',
            'watchlist' => $watchlist,
        ]);
    }
    
    /**
     * Remove item from watchlist
     */
    public function destroy(Request $request, $id)
    {
        $watchlist = $request->user()->watchlist()->findOrFail($id);
        $watchlist->delete();
        
        return response()->json([
            'message' => 'Removed from watchlist',
        ]);
    }
}
