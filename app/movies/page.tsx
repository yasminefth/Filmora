import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"

export default function MoviesPage() {
  // This would come from your API in a real app
  const movies = [
    {
      id: "1",
      title: "Inception",
      image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      year: 2010,
      rating: "PG-13",
      duration: "2h 28m",
      genres: ["Action", "Adventure", "Sci-Fi"],
    },
    {
      id: "2",
      title: "The Dark Knight",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      year: 2008,
      rating: "PG-13",
      duration: "2h 32m",
      genres: ["Action", "Crime", "Drama"],
    },
    {
      id: "3",
      title: "Interstellar",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      year: 2014,
      rating: "PG-13",
      duration: "2h 49m",
      genres: ["Adventure", "Drama", "Sci-Fi"],
    },
    {
      id: "4",
      title: "The Shawshank Redemption",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      year: 1994,
      rating: "R",
      duration: "2h 22m",
      genres: ["Drama"],
    },
    {
      id: "5",
      title: "The Godfather",
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1972,
      rating: "R",
      duration: "2h 55m",
      genres: ["Crime", "Drama"],
    },
    {
      id: "6",
      title: "Pulp Fiction",
      image:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1994,
      rating: "R",
      duration: "2h 34m",
      genres: ["Crime", "Drama"],
    },
    {
      id: "7",
      title: "The Matrix",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      year: 1999,
      rating: "R",
      duration: "2h 16m",
      genres: ["Action", "Sci-Fi"],
    },
    {
      id: "8",
      title: "Forrest Gump",
      image:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      year: 1994,
      rating: "PG-13",
      duration: "2h 22m",
      genres: ["Drama", "Romance"],
    },
    {
      id: "9",
      title: "Fight Club",
      image:
        "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1999,
      rating: "R",
      duration: "2h 19m",
      genres: ["Drama"],
    },
    {
      id: "10",
      title: "Goodfellas",
      image:
        "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1990,
      rating: "R",
      duration: "2h 26m",
      genres: ["Biography", "Crime", "Drama"],
    },
    {
      id: "11",
      title: "The Lord of the Rings: The Fellowship of the Ring",
      image:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      year: 2001,
      rating: "PG-13",
      duration: "2h 58m",
      genres: ["Action", "Adventure", "Drama"],
    },
    {
      id: "12",
      title: "The Silence of the Lambs",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      year: 1991,
      rating: "R",
      duration: "1h 58m",
      genres: ["Crime", "Drama", "Thriller"],
    },
  ]

  // Group movies by first letter for alphabetical display
  const moviesByLetter = movies.reduce(
    (acc, movie) => {
      const firstLetter = movie.title.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(movie)
      return acc
    },
    {} as Record<string, typeof movies>,
  )

  // Sort the letters
  const sortedLetters = Object.keys(moviesByLetter).sort()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Movies</h1>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full sm:w-64">
                <Input type="search" placeholder="Search movies..." className="bg-gray-900 border-gray-700 pr-10" />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button variant="outline" className="border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Alphabetical navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Movies by letter */}
          {sortedLetters.map((letter) => (
            <div key={letter} id={letter} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {moviesByLetter[letter].map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
