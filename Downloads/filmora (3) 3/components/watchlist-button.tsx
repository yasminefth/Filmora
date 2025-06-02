"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2, X, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Image from "next/image";

type MovieItem = {
  id: string;
  title: string;
  image: string;
  addedAt: string;
};

type WatchlistButtonProps = {
  movieId: string;
  movieTitle: string;
  movieImage: string;
};

export default function WatchlistButton({
  movieId,
  movieTitle,
  movieImage,
}: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [watchlist, setWatchlist] = useState<MovieItem[]>([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const loadWatchlist = () => {
      try {
        const stored = localStorage.getItem("filmora-watchlist") || "[]";
        const parsed = JSON.parse(stored);
        setWatchlist(parsed);
        setIsInWatchlist(parsed.some((item: MovieItem) => item.id === movieId));
      } catch (error) {
        console.error("Error loading watchlist:", error);
        toast({
          title: "Error",
          description: "Failed to load watchlist",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadWatchlist();
  }, [movieId]);

  const toggleWatchlist = () => {
    setIsLoading(true);

    try {
      let updatedWatchlist: MovieItem[];

      if (isInWatchlist) {
        // Remove from watchlist
        updatedWatchlist = watchlist.filter((item) => item.id !== movieId);
        toast({
          title: "Removed from watchlist",
          description: `${movieTitle} has been removed from your watchlist.`,
        });
      } else {
        // Add to watchlist
        updatedWatchlist = [
          ...watchlist,
          {
            id: movieId,
            title: movieTitle,
            image: movieImage,
            addedAt: new Date().toISOString(),
          },
        ];
        toast({
          title: "Added to watchlist",
          description: `${movieTitle} has been added to your watchlist.`,
          action: (
            <ToastAction
              altText="View Watchlist"
              onClick={() => setShowWatchlist(true)}
            >
              View Watchlist
            </ToastAction>
          ),
        });
      }

      // Update state and localStorage
      localStorage.setItem("filmora-watchlist", JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast({
        title: "Error",
        description: "There was an error updating your watchlist.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWatchlist = (id: string) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== id);
    localStorage.setItem("filmora-watchlist", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
    if (id === movieId) setIsInWatchlist(false);
    
    toast({
      title: "Removed from watchlist",
      description: "Movie has been removed from your watchlist.",
    });
  };

  return (
    <>
      <Button
        variant="secondary"
        className={`${
          isInWatchlist
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-gray-800 hover:bg-gray-700"
        } transition-colors`}
        onClick={toggleWatchlist}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : isInWatchlist ? (
          <Check className="mr-2 h-5 w-5" />
        ) : (
          <Plus className="mr-2 h-5 w-5" />
        )}
        {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      {/* Watchlist Modal */}
      {showWatchlist && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Watchlist</h2>
                <button
                  onClick={() => setShowWatchlist(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {watchlist.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">Your watchlist is empty</p>
                  <Button
                    onClick={() => setShowWatchlist(false)}
                    className="mt-4"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {watchlist.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex gap-4 items-center p-3 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <div className="relative w-16 h-24 flex-shrink-0">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{movie.title}</h3>
                        <p className="text-sm text-gray-400">
                          Added {new Date(movie.addedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromWatchlist(movie.id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-800"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}