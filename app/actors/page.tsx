import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"

export default function ActorsPage() {
  // This would come from your API in a real app
  const actors = [
    {
      id: "1",
      name: "Leonardo DiCaprio",
      image: "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_.jpg",
      knownFor: ["Inception", "The Revenant", "Titanic"],
    },
    {
      id: "2",
      name: "Tom Hanks",
      image: "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg",
      knownFor: ["Forrest Gump", "Saving Private Ryan", "Cast Away"],
    },
    {
      id: "3",
      name: "Meryl Streep",
      image: "https://m.media-amazon.com/images/M/MV5BMTU4Mjk5MDExOF5BMl5BanBnXkFtZTcwOTU1MTMyMw@@._V1_.jpg",
      knownFor: ["The Devil Wears Prada", "Sophie's Choice", "The Iron Lady"],
    },
    {
      id: "4",
      name: "Denzel Washington",
      image: "https://m.media-amazon.com/images/M/MV5BMjE5NDU2Mzc3MV5BMl5BanBnXkFtZTcwNjAwNTE5OQ@@._V1_.jpg",
      knownFor: ["Training Day", "Malcolm X", "The Equalizer"],
    },
    {
      id: "5",
      name: "Jennifer Lawrence",
      image: "https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg",
      knownFor: ["The Hunger Games", "Silver Linings Playbook", "X-Men: First Class"],
    },
    {
      id: "6",
      name: "Robert Downey Jr.",
      image: "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_.jpg",
      knownFor: ["Iron Man", "Sherlock Holmes", "Avengers"],
    },
    {
      id: "7",
      name: "Scarlett Johansson",
      image: "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg",
      knownFor: ["Black Widow", "Lost in Translation", "Marriage Story"],
    },
    {
      id: "8",
      name: "Brad Pitt",
      image: "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_.jpg",
      knownFor: ["Fight Club", "Once Upon a Time in Hollywood", "Se7en"],
    },
    {
      id: "9",
      name: "Viola Davis",
      image: "https://m.media-amazon.com/images/M/MV5BNzUxNjM4ODI1OV5BMl5BanBnXkFtZTgwNTEwNDE2OTE@._V1_.jpg",
      knownFor: ["The Help", "Fences", "How to Get Away with Murder"],
    },
    {
      id: "10",
      name: "Tom Hardy",
      image: "https://m.media-amazon.com/images/M/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_.jpg",
      knownFor: ["Inception", "Mad Max: Fury Road", "The Dark Knight Rises"],
    },
    {
      id: "11",
      name: "Emma Stone",
      image: "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_.jpg",
      knownFor: ["La La Land", "The Help", "Easy A"],
    },
    {
      id: "12",
      name: "Idris Elba",
      image: "https://m.media-amazon.com/images/M/MV5BNzEzMTI2NjEyNF5BMl5BanBnXkFtZTcwNTA0OTE4OA@@._V1_.jpg",
      knownFor: ["Luther", "The Wire", "Thor"],
    },
    {
      id: "13",
      name: "Cate Blanchett",
      image: "https://m.media-amazon.com/images/M/MV5BMTc1MDI0MDg1NV5BMl5BanBnXkFtZTgwMDM3OTAzMTE@._V1_.jpg",
      knownFor: ["Blue Jasmine", "The Lord of the Rings", "Carol"],
    },
    {
      id: "14",
      name: "Morgan Freeman",
      image: "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_.jpg",
      knownFor: ["The Shawshank Redemption", "Se7en", "Million Dollar Baby"],
    },
    {
      id: "15",
      name: "Charlize Theron",
      image: "https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_.jpg",
      knownFor: ["Mad Max: Fury Road", "Monster", "Atomic Blonde"],
    },
    {
      id: "16",
      name: "Samuel L. Jackson",
      image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      knownFor: ["Pulp Fiction", "Django Unchained", "The Avengers"],
    },
  ]

  // Group actors alphabetically
  const actorsByLetter = actors.reduce(
    (acc, actor) => {
      const firstLetter = actor.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(actor)
      return acc
    },
    {} as Record<string, typeof actors>,
  )

  // Sort the letters
  const sortedLetters = Object.keys(actorsByLetter).sort()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Actors & Actresses</h1>

            <div className="relative w-full md:w-64">
              <Input type="search" placeholder="Search actors..." className="bg-gray-900 border-gray-700 pr-10" />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
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

          {/* Actors by letter */}
          {sortedLetters.map((letter) => (
            <div key={letter} id={letter} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {actorsByLetter[letter].map((actor) => (
                  <Link key={actor.id} href={`/actor/${actor.id}`} className="group">
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
                      <p className="text-sm text-gray-400 truncate">
                        {actor.knownFor.slice(0, 2).join(", ")}
                        {actor.knownFor.length > 2 ? "..." : ""}
                      </p>
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
