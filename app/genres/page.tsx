import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function GenresPage() {
  // This would come from your API in a real app
  const genres = [
    {
      id: "action",
      name: "Action",
      description:
        "Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt work.",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      color: "from-red-600/80",
    },
    {
      id: "comedy",
      name: "Comedy",
      description:
        "Comedy films are designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
      color: "from-yellow-500/80",
    },
    {
      id: "drama",
      name: "Drama",
      description:
        "Drama films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      color: "from-blue-600/80",
    },
    {
      id: "horror",
      name: "Horror",
      description:
        "Horror films are designed to frighten and to invoke our hidden worst fears, often in a terrifying, shocking finale, while captivating and entertaining us at the same time.",
      image: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg",
      color: "from-purple-800/80",
    },
    {
      id: "sci-fi",
      name: "Sci-Fi",
      description:
        "Science fiction films are films that use speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      color: "from-green-600/80",
    },
    {
      id: "thriller",
      name: "Thriller",
      description:
        "Thriller films are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      color: "from-orange-600/80",
    },
    {
      id: "romance",
      name: "Romance",
      description:
        "Romance films are romantic love stories recorded in visual media for broadcast in theaters and on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.",
      image: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg",
      color: "from-pink-500/80",
    },
    {
      id: "animation",
      name: "Animation",
      description:
        "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
      image: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg",
      color: "from-cyan-500/80",
    },
    {
      id: "documentary",
      name: "Documentary",
      description:
        "Documentary films are non-fictional motion pictures intended to document some aspect of reality, primarily for the purposes of instruction, education, or maintaining a historical record.",
      image: "https://m.media-amazon.com/images/M/MV5BMTc5MjcyOTc4N15BMl5BanBnXkFtZTgwMDM5MTI1MjE@._V1_.jpg",
      color: "from-gray-600/80",
    },
    {
      id: "fantasy",
      name: "Fantasy",
      description:
        "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
      image:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
      color: "from-indigo-600/80",
    },
    {
      id: "crime",
      name: "Crime",
      description:
        "Crime films are developed around the sinister actions of criminals or mobsters, particularly bankrobbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and violently murdering their way through life.",
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      color: "from-slate-700/80",
    },
    {
      id: "adventure",
      name: "Adventure",
      description:
        "Adventure films are exciting stories, with new experiences or exotic locales, very similar to or often paired with the action film genre.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      color: "from-amber-600/80",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Browse by Genre</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genres.map((genre) => (
              <Link key={genre.id} href={`/genres/${genre.id}`} className="group">
                <div className="relative h-60 rounded-lg overflow-hidden">
                  <Image
                    src={genre.image || "/placeholder.svg"}
                    alt={genre.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${genre.color} to-transparent`}></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-2xl font-bold mb-2">{genre.name}</h2>
                    <p className="text-sm text-gray-200 line-clamp-2">{genre.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
