import Image from "next/image"
import Link from "next/link"

type Actor = {
  id: string
  name: string
  character: string
  image: string
}

type ActorCardProps = {
  actor: Actor
}

export default function ActorCard({ actor }: ActorCardProps) {
  return (
    <Link href={`/actor/${actor.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={actor.image || "/placeholder.svg"}
          alt={actor.name}
          width={200}
          height={300}
          className="w-full object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <span className="text-sm text-gray-300">View profile</span>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold truncate">{actor.name}</h3>
        <p className="text-sm text-gray-400 truncate">{actor.character}</p>
      </div>
    </Link>
  )
}
