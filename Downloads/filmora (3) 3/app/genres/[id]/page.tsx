import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"

export default function GenrePage({ params }: { params: { id: string } }) {
  // This would come from your API in a real app
  const genreMap: Record<string, { name: string; description: string; color: string }> = {
    action: {
      name: "Action",
      description:
        "Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt work.",
      color: "from-red-600/80",
    },
    comedy: {
      name: "Comedy",
      description:
        "Comedy films are designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment.",
      color: "from-yellow-500/80",
    },
    drama: {
      name: "Drama",
      description:
        "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
      color: "from-blue-600/80",
    },
    horror: {
      name: "Horror",
      description:
        "Horror films are designed to frighten and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time.",
      color: "from-purple-800/80",
    },
    "sci-fi": {
      name: "Sci-Fi",
      description:
        "Science fiction films are films that use speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
      color: "from-green-600/80",
    },
    thriller: {
      name: "Thriller",
      description:
        "Thriller films are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
      color: "from-orange-600/80",
    },
    romance: {
      name: "Romance",
      description:
        "Romance films are romantic love stories recorded in visual media for broadcast in theaters and on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.",
      color: "from-pink-500/80",
    },
    animation: {
      name: "Animation",
      description:
        "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
      color: "from-cyan-500/80",
    },
  }

  const genre = genreMap[params.id] || {
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
    description: "Explore movies and series in this genre.",
    color: "from-gray-600/80",
  }

  // Movies for this genre
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
      id: "17",
      title: "Mad Max: Fury Road",
      image:
        "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      year: 2015,
      rating: "R",
      duration: "2h 0m",
      genres: ["Action", "Adventure", "Sci-Fi"],
    },
    {
      id: "19",
      title: "The Raid",
      image:
        "/theraid.jpeg",
      year: 2011,
      rating: "R",
      duration: "1h 41m",
      genres: ["Action", "Crime", "Thriller"],
    },
    {
      id: "20",
      title: "Die Hard",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 1988,
      rating: "R",
      duration: "2h 12m",
      genres: ["Action", "Thriller"],
    },
    {
      id: "21",
      title: "Kill Bill: Vol. 1",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      year: 2003,
      rating: "R",
      duration: "1h 51m",
      genres: ["Action", "Crime", "Drama"],
    },
    {
      id: "22",
      title: "Gladiator",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      year: 2000,
      rating: "R",
      duration: "2h 35m",
      genres: ["Action", "Adventure", "Drama"],
    },
    {
      id: "23",
      title: "Edge of Tomorrow",
      image: "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_.jpg",
      year: 2014,
      rating: "PG-13",
      duration: "1h 53m",
      genres: ["Action", "Adventure", "Sci-Fi"],
    },
    {
      id: "s1",
      title: "Breaking Bad",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
      year: "2008-2013",
      rating: "TV-MA",
      duration: "5 Seasons",
      genres: ["Crime", "Drama", "Thriller"],
    },
    {
      id: "s4",
      title: "The Last of Us",
      image:
        "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
      year: "2023-Present",
      rating: "TV-MA",
      duration: "1 Season",
      genres: ["Action", "Adventure", "Drama"],
    },
    {
      id: "s5",
      title: "Game of Thrones",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
      year: "2011-2019",
      rating: "TV-MA",
      duration: "8 Seasons",
      genres: ["Action", "Adventure", "Drama"],
    },
    {
      id: "s6",
      title: "The Mandalorian",
      image:"/The Mandalorian.jpeg",
      year: "2019-Present",
      rating: "TV-14",
      duration: "3 Seasons",
      genres: ["Action", "Adventure", "Fantasy"],
    },
  ].filter((movie) => movie.genres.some((g) => g.toLowerCase() === params.id.toLowerCase()))

  // Series for this genre
  const series = [
    {
      id: "s1",
      title: "Breaking Bad",
      image:
        "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
      year: "2008-2013",
      rating: "TV-MA",
      duration: "5 Seasons",
      genres: ["Crime", "Drama", "Thriller"],
    },
    {
      id: "s2",
      title: "Stranger Things",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      year: "2016-Present",
      rating: "TV-14",
      duration: "4 Seasons",
      genres: ["Drama", "Fantasy", "Horror"],
    },
    {
      id: "s3",
      title: "The Crown",
      image:
        "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      year: "2016-2023",
      rating: "TV-MA",
      duration: "6 Seasons",
      genres: ["Biography", "Drama", "History"],
    },
  ].filter((show) => show.genres.some((g) => g.toLowerCase() === params.id.toLowerCase()))

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Genre Header */}
        <div className="relative h-[30vh] w-full mb-8">
          <div className={`absolute inset-0 bg-gradient-to-t ${genre.color} to-transparent`}></div>
          <div className="absolute inset-0 flex flex-col justify-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{genre.name}</h1>
            <p className="text-lg max-w-3xl">{genre.description}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Movies & Series</h2>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full sm:w-64">
                <Input
                  type="search"
                  placeholder={`Search ${genre.name}...`}
                  className="bg-gray-900 border-gray-700 pr-10"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button variant="outline" className="border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Movies Section */}
          {movies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {/* Series Section */}
          {series.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">TV Series</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {series.map((show) => (
                  <MovieCard key={show.id} movie={show} />
                ))}
              </div>
            </div>
          )}

          {movies.length === 0 && series.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No titles found for {genre.name}</h3>
              <p className="text-gray-400">Try searching for a different genre</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
