import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function ActorPage({ params }: { params: { id: string } }) {
  // This would come from your API in a real app
  const actor = {
    id: params.id,
    name: "Leonardo DiCaprio",
    bio: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards. As of 2019, his films have grossed over $7.2 billion worldwide, and he has been placed eight times in annual rankings of the world's highest-paid actors.",
    birthDate: "November 11, 1974",
    birthPlace: "Los Angeles, California, USA",
    height: "6' 0\" (1.83 m)",
    image: "/placeholder.svg?height=600&width=400&text=DiCaprio",
    knownFor: ["Inception", "The Revenant", "Titanic", "The Wolf of Wall Street"],
    awards: ["Academy Award for Best Actor", "3 Golden Globe Awards", "BAFTA Award"],
    socialMedia: {
      instagram: "#",
      twitter: "#",
      facebook: "#",
    },
    filmography: [
      {
        id: "film1",
        title: "Inception",
        year: 2010,
        character: "Dom Cobb",
        image: "/placeholder.svg?height=300&width=200&text=Inception",
      },
      {
        id: "film2",
        title: "The Revenant",
        year: 2015,
        character: "Hugh Glass",
        image: "/placeholder.svg?height=300&width=200&text=Revenant",
      },
      {
        id: "film3",
        title: "The Wolf of Wall Street",
        year: 2013,
        character: "Jordan Belfort",
        image: "/placeholder.svg?height=300&width=200&text=Wolf",
      },
      {
        id: "film4",
        title: "Titanic",
        year: 1997,
        character: "Jack Dawson",
        image: "/placeholder.svg?height=300&width=200&text=Titanic",
      },
      {
        id: "film5",
        title: "Shutter Island",
        year: 2010,
        character: "Teddy Daniels",
        image: "/placeholder.svg?height=300&width=200&text=Shutter",
      },
      {
        id: "film6",
        title: "Django Unchained",
        year: 2012,
        character: "Calvin Candie",
        image: "/placeholder.svg?height=300&width=200&text=Django",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Actor header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={actor.image || "/placeholder.svg"}
                  alt={actor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.instagram}>
                    <span className="sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.twitter}>
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.facebook}>
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <h3 className="text-gray-400">Birth Date</h3>
                  <p>{actor.birthDate}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Birth Place</h3>
                  <p>{actor.birthPlace}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Height</h3>
                  <p>{actor.height}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Biography</h2>
                <p className="text-gray-300">{actor.bio}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Known For</h2>
                <div className="flex flex-wrap gap-2">
                  {actor.knownFor.map((movie, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {movie}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Awards</h2>
                <ul className="list-disc list-inside text-gray-300">
                  {actor.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Filmography */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Filmography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {actor.filmography.map((film) => (
                <Link key={film.id} href={`/movie/${film.id}`} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={film.image || "/placeholder.svg"}
                      alt={film.title}
                      width={200}
                      height={300}
                      className="w-full object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <span className="text-sm text-gray-300">View details</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold truncate">{film.title}</h3>
                    <p className="text-sm text-gray-400">
                      {film.year} • {film.character}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
