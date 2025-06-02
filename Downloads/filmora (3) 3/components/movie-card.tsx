import Image from "next/image"
import Link from "next/link"

type Movie = {
  id: string
  title: string
  image: string
  year: number | string
  rating?: string
  duration?: string
  genres?: string[]
  seasons?: number
}

type MovieCardProps = {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <Image
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <span className="text-sm text-gray-300">View details</span>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <div className="flex items-center text-sm text-gray-400">
          <span>{movie.year}</span>
          {movie.rating && (
            <>
              <span className="mx-1">•</span>
              <span>{movie.rating}</span>
            </>
          )}
          {movie.duration && (
            <>
              <span className="mx-1">•</span>
              <span>{movie.duration}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
