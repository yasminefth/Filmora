import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import Navbar from "@/components/navbar"

export default function SeriesPage() {
  // This would come from your API in a real app
  const series = [
    {
      id: "s1",
      title: "Breaking Bad",
      image:
        "Breaking Bad.jpeg",
      year: "2008-2013",
      rating: "TV-MA",
      seasons: 5,
      genres: ["Crime", "Drama", "Thriller"],
    },
    {
      id: "s2",
      title: "Game of Thrones",
      image:
        "Game of Thrones.jpeg",
      year: "2011-2019",
      rating: "TV-MA",
      seasons: 8,
      genres: ["Action", "Adventure", "Drama"],
    },
    {
      id: "s3",
      title: "Stranger Things",
      image:
        "Stranger Things.jpeg",
      year: "2016-Present",
      rating: "TV-14",
      seasons: 4,
      genres: ["Drama", "Fantasy", "Horror"],
    },
    {
      id: "s4",
      title: "The Wire",
      image:
        "The Wire.jpeg",
      year: "2002-2008",
      rating: "TV-MA",
      seasons: 5,
      genres: ["Crime", "Drama", "Thriller"],
    },
    {
      id: "s5",
      title: "The Sopranos",
      image:
        "The Sopranos.jpeg",
      year: "1999-2007",
      rating: "TV-MA",
      seasons: 6,
      genres: ["Crime", "Drama"],
    },
    {
      id: "s6",
      title: "The Office",
      image:
        "The Office.jpeg",
      year: "2005-2013",
      rating: "TV-14",
      seasons: 9,
      genres: ["Comedy"],
    },
    {
      id: "s7",
      title: "Friends",
      image:
        "Friends.jpeg",
      year: "1994-2004",
      rating: "TV-14",
      seasons: 10,
      genres: ["Comedy", "Romance"],
    },
    {
      id: "s8",
      title: "Chernobyl",
      image:
        "Chernobyl.jpeg",
      year: "2019",
      rating: "TV-MA",
      seasons: 1,
      genres: ["Drama", "History", "Thriller"],
    },
    {
      id: "s9",
      title: "Westworld",
      image:
        "Westworld.jpeg",
      year: "2016-2022",
      rating: "TV-MA",
      seasons: 4,
      genres: ["Drama", "Mystery", "Sci-Fi"],
    },
    {
      id: "s10",
      title: "Black Mirror",
      image:
        "Black Mirror.jpeg",
      year: "2011-Present",
      rating: "TV-MA",
      seasons: 6,
      genres: ["Drama", "Sci-Fi", "Thriller"],
    },
    {
      id: "s11",
      title: "The Crown",
      image:
        "The Crown.jpeg",
      year: "2016-Present",
      rating: "TV-MA",
      seasons: 6,
      genres: ["Biography", "Drama", "History"],
    },
    {
      id: "s12",
      title: "Peaky Blinders",
      image:
        "Peaky Blinders.jpeg",
      year: "2013-2022",
      rating: "TV-MA",
      seasons: 6,
      genres: ["Crime", "Drama"],
    },
  ]

  // Group series by genre for categorical display
  const seriesByGenre: Record<string, typeof series> = {}

  series.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!seriesByGenre[genre]) {
        seriesByGenre[genre] = []
      }
      if (!seriesByGenre[genre].find((s) => s.id === show.id)) {
        seriesByGenre[genre].push(show)
      }
    })
  })

  // Sort the genres
  const sortedGenres = Object.keys(seriesByGenre).sort()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">TV Series</h1>

            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full sm:w-64">
                <Input type="search" placeholder="Search series..." className="bg-gray-900 border-gray-700 pr-10" />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button variant="outline" className="border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Genre navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sortedGenres.map((genre) => (
              <a
                key={genre}
                href={`#${genre}`}
                className="px-4 py-1 rounded-full bg-gray-800 hover:bg-red-600 transition-colors text-sm"
              >
                {genre}
              </a>
            ))}
          </div>

          {/* Series by genre */}
          {sortedGenres.map((genre) => (
            <div key={genre} id={genre} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">{genre}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {seriesByGenre[genre].map((show) => (
                  <Link key={show.id} href={`/series/${show.id}`} className="group">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                      <Image
                        src={show.image || "/placeholder.svg"}
                        alt={show.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <span className="text-sm text-gray-300">View details</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold truncate">{show.title}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <span>{show.year}</span>
                        <span className="mx-1">•</span>
                        <span>
                          {show.seasons} {show.seasons === 1 ? "Season" : "Seasons"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
