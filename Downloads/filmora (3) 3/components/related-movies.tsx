import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

type Movie = {
  id: string
  title: string
  image: string
  year: number
  rating: string
}

type RelatedMoviesProps = {
  currentMovieId: string
  relatedMovies: Movie[]
}

export default function RelatedMovies({ currentMovieId, relatedMovies }: RelatedMoviesProps) {
  const movies = relatedMovies.filter(
    (movie) => String(movie.id) !== String(currentMovieId)
  )

  return (
    <div className="space-y-4">
      {movies.map((movie) => {
        console.log('Rendering related movie link:', movie.id, movie.title)
        return (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group"
            onClick={() => {
              console.log('Clicked related movie:', movie.id, movie.title)
            }}
          >
            <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold group-hover:text-red-500 transition-colors">{movie.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{movie.year}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
