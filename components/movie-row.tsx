"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

type MovieRowProps = {
  category: string
}

export default function MovieRow({ category }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)

  // Different movies for different categories
  const getMoviesForCategory = () => {
    switch (category) {
      case "trending":
        return [
          {
            id: "1",
            title: "Inception",
            image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
            year: 2010,
            rating: "PG-13",
            duration: "2h 28m",
            match: 95,
            genres: ["Action", "Adventure", "Sci-Fi"],
          },
          {
            id: "2",
            title: "The Dark Knight",
            image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
            year: 2008,
            rating: "PG-13",
            duration: "2h 32m",
            match: 94,
            genres: ["Action", "Crime", "Drama"],
          },
          {
            id: "3",
            title: "Parasite",
            image:
              "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            year: 2019,
            rating: "R",
            duration: "2h 12m",
            match: 96,
            genres: ["Drama", "Thriller"],
          },
          {
            id: "4",
            title: "Everything Everywhere All at Once",
            image:
              "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
            year: 2022,
            rating: "R",
            duration: "2h 19m",
            match: 92,
            genres: ["Action", "Adventure", "Comedy"],
          },
          {
            id: "5",
            title: "Spirited Away",
            image:
              "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
            year: 2001,
            rating: "PG",
            duration: "2h 5m",
            match: 97,
            genres: ["Animation", "Adventure", "Family"],
          },
          {
            id: "6",
            title: "The Godfather",
            image:
              "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            year: 1972,
            rating: "R",
            duration: "2h 55m",
            match: 98,
            genres: ["Crime", "Drama"],
          },
          {
            id: "7",
            title: "Pulp Fiction",
            image:
              "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            year: 1994,
            rating: "R",
            duration: "2h 34m",
            match: 94,
            genres: ["Crime", "Drama"],
          },
          {
            id: "8",
            title: "The Matrix",
            image:
              "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            year: 1999,
            rating: "R",
            duration: "2h 16m",
            match: 88,
            genres: ["Action", "Sci-Fi"],
          },
        ]
      case "popular":
        return [
          {
            id: "9",
            title: "Oppenheimer",
            image:
              "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
            year: 2023,
            rating: "R",
            duration: "3h 0m",
            match: 93,
            genres: ["Biography", "Drama", "History"],
          },
          {
            id: "10",
            title: "Barbie",
            image:
              "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
            year: 2023,
            rating: "PG-13",
            duration: "1h 54m",
            match: 88,
            genres: ["Adventure", "Comedy", "Fantasy"],
          },
          {
            id: "11",
            title: "Dune",
            image:
              "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
            year: 2021,
            rating: "PG-13",
            duration: "2h 35m",
            match: 91,
            genres: ["Action", "Adventure", "Drama"],
          },
          {
            id: "12",
            title: "The Batman",
            image:
              "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
            year: 2022,
            rating: "PG-13",
            duration: "2h 56m",
            match: 85,
            genres: ["Action", "Crime", "Drama"],
          },
          {
            id: "13",
            title: "Top Gun: Maverick",
            image:
              "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
            year: 2022,
            rating: "PG-13",
            duration: "2h 10m",
            match: 96,
            genres: ["Action", "Drama"],
          },
          {
            id: "14",
            title: "Avatar: The Way of Water",
            image:
              "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg",
            year: 2022,
            rating: "PG-13",
            duration: "3h 12m",
            match: 82,
            genres: ["Action", "Adventure", "Fantasy"],
          },
          {
            id: "15",
            title: "The Super Mario Bros. Movie",
            image:
              "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_.jpg",
            year: 2023,
            rating: "PG",
            duration: "1h 32m",
            match: 79,
            genres: ["Animation", "Adventure", "Comedy"],
          },
          {
            id: "16",
            title: "John Wick: Chapter 4",
            image:
              "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
            year: 2023,
            rating: "R",
            duration: "2h 49m",
            match: 90,
            genres: ["Action", "Crime", "Thriller"],
          },
        ]
      case "series":
        return [
          {
            id: "s1",
            title: "Breaking Bad",
            image:
              "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
            year: "2008-2013",
            rating: "TV-MA",
            duration: "5 Seasons",
            match: 98,
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
            match: 93,
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
            match: 91,
            genres: ["Biography", "Drama", "History"],
          },
          {
            id: "s4",
            title: "The Last of Us",
            image:
              "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
            year: "2023-Present",
            rating: "TV-MA",
            duration: "1 Season",
            match: 94,
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
            match: 89,
            genres: ["Action", "Adventure", "Drama"],
          },
          {
            id: "s6",
            title: "The Mandalorian",
            image:
              "https://m.media-amazon.com/images/M/MV5BZjRlMzM3N2MtOTZiNy00MGJlLTk0ZTQtMzExNDQ1ZDgzZjFkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
            year: "2019-Present",
            rating: "TV-14",
            duration: "3 Seasons",
            match: 92,
            genres: ["Action", "Adventure", "Fantasy"],
          },
          {
            id: "s7",
            title: "Wednesday",
            image:
              "https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
            year: "2022-Present",
            rating: "TV-14",
            duration: "1 Season",
            match: 85,
            genres: ["Comedy", "Crime", "Fantasy"],
          },
          {
            id: "s8",
            title: "Succession",
            image:
              "https://m.media-amazon.com/images/M/MV5BNWYwODRhYmUtZDMxYi00YTdmLWI2M2UtZTRiYWRlNTdiZWYwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
            year: "2018-2023",
            rating: "TV-MA",
            duration: "4 Seasons",
            match: 97,
            genres: ["Drama"],
          },
        ]
      case "action":
        return [
          {
            id: "17",
            title: "Mad Max: Fury Road",
            image:
              "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
            year: 2015,
            rating: "R",
            duration: "2h 0m",
            match: 97,
            genres: ["Action", "Adventure", "Sci-Fi"],
          },
          {
            id: "18",
            title: "Mission: Impossible - Dead Reckoning",
            image:
              "https://m.media-amazon.com/images/M/MV5BYzFiZjc1YzctMDY3Zi00NGE5LTlmNWEtN2Q3OWFjYjY1NGM2XkEyXkFqcGdeQXVyMTUyMTUzNjQ0._V1_.jpg",
            year: 2023,
            rating: "PG-13",
            duration: "2h 43m",
            match: 86,
            genres: ["Action", "Adventure", "Thriller"],
          },
          {
            id: "19",
            title: "The Raid",
            image:
              "https://m.media-amazon.com/images/M/MV5BZGIxODNjM2YtZjA5YS00YzEwLWIzODItMjMzNWU2MDE5OTVmXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
            year: 2011,
            rating: "R",
            duration: "1h 41m",
            match: 92,
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
            match: 94,
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
            match: 91,
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
            match: 87,
            genres: ["Action", "Adventure", "Drama"],
          },
          {
            id: "23",
            title: "Edge of Tomorrow",
            image: "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_.jpg",
            year: 2014,
            rating: "PG-13",
            duration: "1h 53m",
            match: 90,
            genres: ["Action", "Adventure", "Sci-Fi"],
          },
          {
            id: "24",
            title: "The Bourne Identity",
            image:
              "https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg",
            year: 2002,
            rating: "PG-13",
            duration: "1h 59m",
            match: 93,
            genres: ["Action", "Mystery", "Thriller"],
          },
        ]
      case "comedy":
        return [
          {
            id: "25",
            title: "Superbad",
            image: "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg",
            year: 2007,
            rating: "R",
            duration: "1h 53m",
            match: 88,
            genres: ["Comedy"],
          },
          {
            id: "26",
            title: "The Grand Budapest Hotel",
            image: "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg",
            year: 2014,
            rating: "R",
            duration: "1h 39m",
            match: 92,
            genres: ["Adventure", "Comedy", "Crime"],
          },
          {
            id: "27",
            title: "Bridesmaids",
            image: "https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_.jpg",
            year: 2011,
            rating: "R",
            duration: "2h 5m",
            match: 90,
            genres: ["Comedy", "Romance"],
          },
          {
            id: "28",
            title: "Shaun of the Dead",
            image:
              "https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            year: 2004,
            rating: "R",
            duration: "1h 39m",
            match: 92,
            genres: ["Comedy", "Horror"],
          },
          {
            id: "29",
            title: "The Hangover",
            image:
              "https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            year: 2009,
            rating: "R",
            duration: "1h 40m",
            match: 87,
            genres: ["Comedy"],
          },
          {
            id: "30",
            title: "Borat",
            image: "https://m.media-amazon.com/images/M/MV5BMTk0MTQ3NDQ4Ml5BMl5BanBnXkFtZTcwOTQ3OTQzMw@@._V1_.jpg",
            year: 2006,
            rating: "R",
            duration: "1h 24m",
            match: 89,
            genres: ["Comedy"],
          },
          {
            id: "31",
            title: "Airplane!",
            image:
              "https://m.media-amazon.com/images/M/MV5BZjA3YjdhMWEtYjc2Ni00YzVlLWI0MTUtMGZmNTJjNmU0Yzk2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            year: 1980,
            rating: "PG",
            duration: "1h 28m",
            match: 94,
            genres: ["Comedy"],
          },
          {
            id: "32",
            title: "Dumb and Dumber",
            image:
              "https://m.media-amazon.com/images/M/MV5BZDQwMjNiMTQtY2UwYy00NjhiLTk0ZWEtZWM5ZWMzNGFjNTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            year: 1994,
            rating: "PG-13",
            duration: "1h 47m",
            match: 86,
            genres: ["Comedy"],
          },
        ]
      default:
        return []
    }
  }

  const movies = getMoviesForCategory()

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="relative group">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Movies row */}
      <div ref={rowRef} className="flex space-x-2 overflow-x-scroll scrollbar-hide py-4" onScroll={handleScroll}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative flex-shrink-0 w-[200px] h-[300px] transition-all duration-300 ease-in-out"
            style={{
              width: hoveredMovie === movie.id ? "300px" : "200px",
              height: hoveredMovie === movie.id ? "350px" : "300px",
              zIndex: hoveredMovie === movie.id ? 10 : 0,
            }}
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <Link href={movie.id.startsWith("s") ? `/series/${movie.id}` : `/movie/${movie.id}`}>
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />

                {hoveredMovie === movie.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-3">
                    <h3 className="font-bold text-lg mb-1">{movie.title}</h3>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-500 font-semibold text-sm">{movie.match}% Match</span>
                      <span className="text-xs">{movie.rating}</span>
                      <span className="text-xs">{movie.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {movie.genres.map((genre, index) => (
                        <span key={index} className="text-xs">
                          {genre}
                          {index < movie.genres.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="icon" className="rounded-full bg-white hover:bg-gray-200 text-black">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full bg-gray-600/80 hover:bg-gray-600">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full bg-gray-600/80 hover:bg-gray-600">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-gray-600/80 hover:bg-gray-600 ml-auto"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
