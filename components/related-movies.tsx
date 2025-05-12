import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

type RelatedMoviesProps = {
  currentMovieId: string
}

export default function RelatedMovies({ currentMovieId }: RelatedMoviesProps) {
  // This would come from your API in a real app
  const relatedMovies = [
    {
      id: "2",
      title: "The Dark Knight",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      year: 2008,
      rating: 9.0,
    },
    {
      id: "3",
      title: "Parasite",
      image:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
      year: 2019,
      rating: 8.5,
    },
    {
      id: "4",
      title: "Everything Everywhere All at Once",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
      year: 2022,
      rating: 7.8,
    },
    {
      id: "5",
      title: "Spirited Away",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      year: 2001,
      rating: 8.6,
    },
  ].filter((movie) => movie.id !== currentMovieId)

  return (
    <div className="space-y-4">
      {relatedMovies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
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
      ))}
    </div>
  )
}
