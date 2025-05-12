"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Plus, ThumbsUp, Share2, Star, X } from "lucide-react"
import Navbar from "@/components/navbar"
import CommentSection from "@/components/comment-section"
import VideoPlayer from "@/components/video-player"

// This would come from your API in a real app
const series = [
  {
    id: "s1",
    title: "Breaking Bad",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    year: "2008-2013",
    rating: "TV-MA",
    seasons: 5,
    episodes: 62,
    genres: ["Crime", "Drama", "Thriller"],
    starring: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    creator: "Vince Gilligan",
    image:
      "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY", // Breaking Bad trailer
    imdbRating: 9.5,
    network: "AMC",
    language: "English",
    country: "United States",
    awards: "Won 16 Primetime Emmys. 152 wins & 238 nominations total",
    actors: [
      {
        id: "s1a1",
        name: "Bryan Cranston",
        character: "Walter White",
        image: "https://m.media-amazon.com/images/M/MV5BMTA2NjEyMTY4MTVeQTJeQWpwZ15BbWU3MDQ5NDAzNDc@._V1_.jpg",
      },
      {
        id: "s1a2",
        name: "Aaron Paul",
        character: "Jesse Pinkman",
        image: "https://m.media-amazon.com/images/M/MV5BMTY1OTY5NjI5NV5BMl5BanBnXkFtZTcwODA4MjM0OA@@._V1_.jpg",
      },
      {
        id: "s1a3",
        name: "Anna Gunn",
        character: "Skyler White",
        image: "https://m.media-amazon.com/images/M/MV5BMTU0NTk3MDQ3OV5BMl5BanBnXkFtZTcwNDY3NzQ4Mg@@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s1e1",
        title: "Pilot",
        season: 1,
        episode: 1,
        description:
          "A high school chemistry teacher is diagnosed with terminal lung cancer and turns to a life of crime.",
        duration: "58m",
        image:
          "https://m.media-amazon.com/images/M/MV5BNTZlMGY1OWItZWJiMy00MTZlLThhMGItNDQ2ODM3YTNjNzRiXkEyXkFqcGdeQXVyNzgyOTQ4MDc@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY",
      },
      {
        id: "s1e2",
        title: "Cat's in the Bag...",
        season: 1,
        episode: 2,
        description: "Walt and Jesse attempt to dispose of the bodies of two rivals, but fail to do so.",
        duration: "48m",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MzU5MzIwMl5BMl5BanBnXkFtZTgwNjA5Njk5MjE@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY",
      },
    ],
  },
  {
    id: "s2",
    title: "Stranger Things",
    description:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    year: "2016-Present",
    rating: "TV-14",
    seasons: 4,
    episodes: 34,
    genres: ["Drama", "Fantasy", "Horror"],
    starring: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    creator: "The Duffer Brothers",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU", // Stranger Things trailer
    imdbRating: 8.7,
    network: "Netflix",
    language: "English",
    country: "United States",
    awards: "Won 7 Primetime Emmys. 94 wins & 247 nominations total",
    actors: [
      {
        id: "s2a1",
        name: "Millie Bobby Brown",
        character: "Eleven",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5NzA0NzQzMF5BMl5BanBnXkFtZTgwMTQxNjUzNjM@._V1_.jpg",
      },
      {
        id: "s2a2",
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        image:
          "https://m.media-amazon.com/images/M/MV5BNzAyOTNjOTUtYTdiNS00ZmM1LTk0ZTQtZTY2ZTNlMzgwYTQwXkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg",
      },
      {
        id: "s2a3",
        name: "Winona Ryder",
        character: "Joyce Byers",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ3NzM3MTc2NF5BMl5BanBnXkFtZTcwODMxNjA0NA@@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s2e1",
        title: "Chapter One: The Vanishing of Will Byers",
        season: 1,
        episode: 1,
        description:
          "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
        duration: "49m",
        image: "https://m.media-amazon.com/images/M/MV5BMTUzNTU5MjM5Ml5BMl5BanBnXkFtZTgwODAwMDI4OTE@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
      },
      {
        id: "s2e2",
        title: "Chapter Two: The Weirdo on Maple Street",
        season: 1,
        episode: 2,
        description:
          "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
        duration: "56m",
        image: "https://m.media-amazon.com/images/M/MV5BMTgzNjA2NDYyOF5BMl5BanBnXkFtZTgwOTAwMDI4OTE@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/b9EkMc79ZSU",
      },
    ],
  },
  {
    id: "s3",
    title: "The Crown",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    year: "2016-2023",
    rating: "TV-MA",
    seasons: 6,
    episodes: 60,
    genres: ["Biography", "Drama", "History"],
    starring: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    creator: "Peter Morgan",
    image:
      "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    videoUrl: "https://www.youtube.com/embed/JWtnJjn6ng0", // The Crown trailer
    imdbRating: 8.7,
    network: "Netflix",
    language: "English",
    country: "United Kingdom",
    awards: "Won 21 Primetime Emmys. 93 wins & 251 nominations total",
    actors: [
      {
        id: "s3a1",
        name: "Claire Foy",
        character: "Queen Elizabeth II (Seasons 1-2)",
        image:
          "https://m.media-amazon.com/images/M/MV5BZmYxZjE4ODYtYjU4ZC00NDgzLWIxZjctODZkNjg4MGFjNWZiXkEyXkFqcGdeQXVyMTM1MjAxMDc3._V1_.jpg",
      },
      {
        id: "s3a2",
        name: "Olivia Colman",
        character: "Queen Elizabeth II (Seasons 3-4)",
        image:
          "https://m.media-amazon.com/images/M/MV5BZWEzMGY4OTQtYTdmMy00M2QwLTliYTQtYWUzYzc3OTA5YzIwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
      },
      {
        id: "s3a3",
        name: "Imelda Staunton",
        character: "Queen Elizabeth II (Seasons 5-6)",
        image: "https://m.media-amazon.com/images/M/MV5BMTYxNzc0NjI3N15BMl5BanBnXkFtZTcwMzUxMzM3Mw@@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s3e1",
        title: "Wolferton Splash",
        season: 1,
        episode: 1,
        description:
          "A young Princess Elizabeth marries Prince Philip. As King George VI's health worsens, Winston Churchill is elected prime minister for the second time.",
        duration: "57m",
        image: "https://m.media-amazon.com/images/M/MV5BMTU4Mzk3ODIyOV5BMl5BanBnXkFtZTgwODgyNzk2MDI@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/JWtnJjn6ng0",
      },
      {
        id: "s3e2",
        title: "Hyde Park Corner",
        season: 1,
        episode: 2,
        description:
          "With King George too ill to travel, Elizabeth and Philip embark on a four-continent Commonwealth tour. Party leaders attempt to undermine Churchill.",
        duration: "61m",
        image: "https://m.media-amazon.com/images/M/MV5BMjE1MTk5NDQ5Nl5BMl5BanBnXkFtZTgwOTgyNzk2MDI@._V1_.jpg",
        videoUrl: "https://www.youtube.com/embed/JWtnJjn6ng0",
      },
    ],
  },
]

export default function SeriesPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null)

  // Find the series by ID
  const show = series.find((s) => s.id === params.id) || series[0]

  // Get the selected episode or default to the first one
  const episode = selectedEpisode ? show.episodes.find((ep) => ep.id === selectedEpisode) : show.episodes[0]

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
            <VideoPlayer videoUrl={selectedEpisode ? episode?.videoUrl || show.videoUrl : show.videoUrl} />
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image src={show.image || "/placeholder.svg"} alt={show.title} fill className="object-cover" priority />
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

        {/* Series details */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{show.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">{show.imdbRating}</span>
                  <span className="text-gray-400 ml-1">/10</span>
                </div>
                <span>{show.year}</span>
                <span>{show.rating}</span>
                <span>
                  {show.seasons} {show.seasons === 1 ? "Season" : "Seasons"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre, index) => (
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
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-300">{show.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <h3 className="text-gray-400">Creator</h3>
                  <p>{show.creator}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Year</h3>
                  <p>{show.year}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Language</h3>
                  <p>{show.language}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Country</h3>
                  <p>{show.country}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Network</h3>
                  <p>{show.network}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Episodes</h3>
                  <p>{show.episodes.length}</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Awards</h2>
                <p className="text-gray-300">{show.awards}</p>
              </div>

              {/* Episodes section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Episodes</h2>
                <div className="space-y-4">
                  {show.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className={`flex gap-4 p-3 rounded-lg cursor-pointer ${selectedEpisode === ep.id ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
                      onClick={() => {
                        setSelectedEpisode(ep.id)
                        setIsPlaying(true)
                      }}
                    >
                      <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={ep.image || show.image} alt={ep.title} fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="h-8 w-8" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{ep.title}</h3>
                        <div className="text-sm text-gray-400 mb-1">
                          Season {ep.season}, Episode {ep.episode} • {ep.duration}
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2">{ep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cast section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {show.actors.map((actor) => (
                    <div key={actor.id} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <Image
                          src={actor.image || "/placeholder.svg"}
                          alt={actor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <span className="text-sm text-gray-300">View profile</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="font-semibold truncate">{actor.name}</h3>
                        <p className="text-sm text-gray-400 truncate">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments section */}
              <CommentSection movieId={show.id} movieTitle={show.title} />
            </div>

            <div>
              {/* Similar series */}
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <div className="space-y-4">
                {series
                  .filter((s) => s.id !== show.id)
                  .map((similarShow) => (
                    <Link key={similarShow.id} href={`/series/${similarShow.id}`} className="group">
                      <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={similarShow.image || "/placeholder.svg"}
                            alt={similarShow.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold group-hover:text-red-500 transition-colors">
                            {similarShow.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{similarShow.year}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{similarShow.imdbRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
