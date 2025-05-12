"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Plus, ThumbsUp, Share2, Download, Star, X } from "lucide-react"
import Navbar from "@/components/navbar"
import CommentSection from "@/components/comment-section"
import ActorCard from "@/components/actor-card"
import RelatedMovies from "@/components/related-movies"
import VideoPlayer from "@/components/video-player"

// This would come from your API in a real app
const movies = [
  {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    year: 2010,
    rating: "PG-13",
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0", // Inception trailer
    imdbRating: 8.8,
    releaseDate: "July 16, 2010",
    language: "English",
    country: "United States",
    awards: "Won 4 Oscars. 157 wins & 220 nominations total",
    boxOffice: "$292,576,195",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "1",
        name: "Leonardo DiCaprio",
        character: "Dom Cobb",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_.jpg",
      },
      {
        id: "2",
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTY3NTk0NDI3Ml5BMl5BanBnXkFtZTgwNDA3NjY0MjE@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
      },
      {
        id: "3",
        name: "Elliot Page",
        character: "Ariadne",
        image:
          "https://m.media-amazon.com/images/M/MV5BYWY0NzFmYjAtYzMwNC00ODc3LWI2ZWEtOTU3YTM0Y2ZiNTM5XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg",
      },
      {
        id: "4",
        name: "Tom Hardy",
        character: "Eames",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_.jpg",
      },
      {
        id: "5",
        name: "Ken Watanabe",
        character: "Saito",
        image: "https://m.media-amazon.com/images/M/MV5BMTQzMTUzNjc4Nl5BMl5BanBnXkFtZTcwMTUyODU2Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    rating: "PG-13",
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    starring: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/EXeTwQWrcwY", // The Dark Knight trailer
    imdbRating: 9.0,
    releaseDate: "July 18, 2008",
    language: "English",
    country: "United States",
    awards: "Won 2 Oscars. 159 wins & 163 nominations total",
    boxOffice: "$534,858,444",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "6",
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        image: "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_.jpg",
      },
      {
        id: "7",
        name: "Heath Ledger",
        character: "Joker",
        image: "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_.jpg",
      },
      {
        id: "8",
        name: "Aaron Eckhart",
        character: "Harvey Dent",
        image: "https://m.media-amazon.com/images/M/MV5BMTc4MTAyNzMzNF5BMl5BanBnXkFtZTcwMzQ5MzQzMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "Parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    year: 2019,
    rating: "R",
    duration: "2h 12m",
    genres: ["Drama", "Thriller"],
    starring: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    director: "Bong Joon Ho",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/5xH0HfJHsaY", // Parasite trailer
    imdbRating: 8.5,
    releaseDate: "November 8, 2019",
    language: "Korean",
    country: "South Korea",
    awards: "Won 4 Oscars. 306 wins & 271 nominations total",
    boxOffice: "$53,367,844",
    production: "Neon",
    actors: [
      {
        id: "9",
        name: "Song Kang-ho",
        character: "Ki Taek",
        image: "https://m.media-amazon.com/images/M/MV5BMTc4MTAyNzMzNF5BMl5BanBnXkFtZTcwMzQ5MzQzMw@@._V1_.jpg",
      },
      {
        id: "10",
        name: "Lee Sun-kyun",
        character: "Dong Ik",
        image:
          "https://m.media-amazon.com/images/M/MV5BYWFlMmVhZGEtMzNkYi00YTIxLWFkYmEtZGRkODg3ZTkyNTcxXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "4",
    title: "Everything Everywhere All at Once",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    year: 2022,
    rating: "R",
    duration: "2h 19m",
    genres: ["Action", "Adventure", "Comedy"],
    starring: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    director: "Daniel Kwan, Daniel Scheinert",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/wxN1T1uxQ2g", // Everything Everywhere All at Once trailer
    imdbRating: 7.8,
    releaseDate: "April 8, 2022",
    language: "English, Mandarin, Cantonese",
    country: "United States",
    awards: "Won 7 Oscars. 366 wins & 171 nominations total",
    boxOffice: "$77,147,676",
    production: "A24",
    actors: [
      {
        id: "11",
        name: "Michelle Yeoh",
        character: "Evelyn Wang",
        image: "https://m.media-amazon.com/images/M/MV5BMTc3NjY0MTY3N15BMl5BanBnXkFtZTgwNzU0MTQ3MDI@._V1_.jpg",
      },
      {
        id: "12",
        name: "Ke Huy Quan",
        character: "Waymond Wang",
        image:
          "https://m.media-amazon.com/images/M/MV5BZTlkM2U2YWQtMjFmZS00ODk1LWI2ZDktNGUyZjVkN2IxZTc1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      },
    ],
  },
  {
    id: "5",
    title: "Spirited Away",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    year: 2001,
    rating: "PG",
    duration: "2h 5m",
    genres: ["Animation", "Adventure", "Family"],
    starring: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    director: "Hayao Miyazaki",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/ByXuk9QqQkk", // Spirited Away trailer
    imdbRating: 8.6,
    releaseDate: "March 28, 2003",
    language: "Japanese",
    country: "Japan",
    awards: "Won 1 Oscar. 58 wins & 31 nominations total",
    boxOffice: "$10,055,859",
    production: "Studio Ghibli",
    actors: [
      {
        id: "13",
        name: "Daveigh Chase",
        character: "Chihiro (voice: English version)",
        image: "https://m.media-amazon.com/images/M/MV5BMTgzMjgyNTYwMF5BMl5BanBnXkFtZTcwMTg5NjMwNA@@._V1_.jpg",
      },
      {
        id: "14",
        name: "Miyu Irino",
        character: "Haku (voice)",
        image:
          "https://m.media-amazon.com/images/M/MV5BNWRkMjA0NjctODU0ZS00ZmFiLWIwYzktNThmM2NlOTNiMmZiXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg",
      },
    ],
  },
]

export default function MoviePage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Find the movie by ID
  const movie = movies.find((m) => m.id === params.id) || movies[0]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        {isPlaying ? (
          <div className="relative">
            <div className="absolute top-4 right-4 z-20">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-black/70"
                onClick={() => setIsPlaying(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <VideoPlayer videoUrl={movie.videoUrl} />
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Movie details */}
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
                  <Link
                    key={index}
                    href={`/genres/${genre.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsPlaying(true)}>
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                  <Plus className="mr-2 h-5 w-5" /> Add to Watchlist
                </Button>
                <Button variant="outline" className="border-gray-600">
                  <ThumbsUp className="mr-2 h-5 w-5" /> Rate
                </Button>
                <Button variant="outline" className="border-gray-600">
                  <Share2 className="mr-2 h-5 w-5" /> Share
                </Button>
                <Button variant="outline" className="border-gray-600">
                  <Download className="mr-2 h-5 w-5" /> Download
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

              {/* Cast section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.actors.map((actor) => (
                    <ActorCard key={actor.id} actor={actor} />
                  ))}
                </div>
              </div>

              {/* Comments section */}
              <CommentSection movieId={movie.id} movieTitle={movie.title} />
            </div>

            <div>
              {/* Related movies */}
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <RelatedMovies currentMovieId={movie.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
