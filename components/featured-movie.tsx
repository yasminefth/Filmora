"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Info, Plus, Volume2, VolumeX } from "lucide-react"

export default function FeaturedMovie() {
  const [isMuted, setIsMuted] = useState(true)

  // This would come from your API in a real app
  const featuredMovie = {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: 2010,
    rating: "PG-13",
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    videoUrl: "#", // This would be the actual video URL in a real app
  }

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background image/video */}
      <div className="absolute inset-0">
        <Image
          src={featuredMovie.image || "/placeholder.svg"}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-4 md:px-8 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredMovie.title}</h1>

        <div className="flex items-center space-x-4 mb-4">
          <span className="text-green-500 font-semibold">98% Match</span>
          <span>{featuredMovie.year}</span>
          <span>{featuredMovie.rating}</span>
          <span>{featuredMovie.duration}</span>
        </div>

        <p className="text-lg mb-6 text-gray-200 line-clamp-3 md:line-clamp-none">{featuredMovie.description}</p>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-white hover:bg-gray-200 text-black font-semibold px-6">
            <Play className="mr-2 h-5 w-5" /> Play
          </Button>
          <Button variant="secondary" className="bg-gray-600/80 hover:bg-gray-600 text-white font-semibold px-6">
            <Info className="mr-2 h-5 w-5" /> More Info
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-800/60 hover:bg-gray-800">
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800/60 hover:bg-gray-800"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
