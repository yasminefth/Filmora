"use client";

import { useState , use} from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ThumbsUp, Share2, Download, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import CommentSection from "@/components/comment-section";
import ActorCard from "@/components/actor-card";
import RelatedMovies from "@/components/related-movies";
import EnhancedVideoPlayer from "@/components/enhanced-video-player";
import WatchlistButton from "@/components/watchlist-button";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { movies } from "@/data/movies"; // Your movies data

export default function MoviePage() {
  // Properly get params using useParams()
  const params = use(useParams());
  const id = params?.id as string; // Safely access id with optional chaining
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrailer, setIsTrailer] = useState(false);
  const { toast } = useToast();

  // Find movie by comparing string IDs
  const movie = movies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold mt-20">Movie not found</h1>
        <p className="text-gray-400 mt-4">
          Sorry, we couldn't find the movie you're looking for.
        </p>
        <Link href="/" className="mt-8 underline text-blue-400">
          Go back home
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: movie.title,
          text: `Check out ${movie.title} on Filmora`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Movie link copied to clipboard",
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        {isPlaying ? (
          <div className="relative">
            <EnhancedVideoPlayer
              videoUrl={isTrailer ? movie.trailerUrl : movie.videoUrl || movie.trailerUrl}
              title={movie.title}
              poster={movie.image}
              onClose={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => {
                  setIsTrailer(!movie.videoUrl);
                  setIsPlaying(true);
                }}
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">{movie.imdbRating}</span>
                  <span className="text-gray-400 ml-1">/10</span>
                </div>
                <span>{movie.year}</span>
                <span>{movie.rating}</span>
                <span>{movie.duration}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setIsTrailer(false);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600"
                  onClick={() => {
                    setIsTrailer(true);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="mr-2 h-5 w-5" /> er
                </Button>
                <WatchlistButton
                  movieId={movie.id}
                  movieTitle={movie.title}
                  movieImage={movie.image}
                />
                <Button
                  variant="outline"
                  className="border-gray-600"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5 text-black" /> Share
                </Button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-300">{movie.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <h3 className="text-gray-400">Director</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Release Date</h3>
                  <p>{movie.releaseDate}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Language</h3>
                  <p>{movie.language}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Country</h3>
                  <p>{movie.country}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Production</h3>
                  <p>{movie.production}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Box Office</h3>
                  <p>{movie.boxOffice}</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Awards</h2>
                <p className="text-gray-300">{movie.awards}</p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.actors?.map((actor) => (
                    <ActorCard key={actor.id} actor={actor} />
                  ))}
                </div>
              </div>

              <CommentSection movieId={movie.id} movieTitle={movie.title} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <RelatedMovies currentMovieId={movie.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}