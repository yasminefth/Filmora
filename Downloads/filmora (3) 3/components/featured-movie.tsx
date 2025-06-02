"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Info, Plus, Volume2, VolumeX } from "lucide-react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { toast as useToast } from "@/components/ui/use-toast"; // Import useToast

export default function FeaturedMovie() {
  const [isMuted, setIsMuted] = useState(true);
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast

  // This would come from your API in a real app
  const featuredMovie = {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: 2010,
    rating: "PG-13",
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    director: "Christopher Nolan",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8", // Example actual video URL
    detailsRoute: "/movie/1", // Define a specific route for Inception's details
  };

  const handlePlay = () => {
    if (featuredMovie.videoUrl && featuredMovie.videoUrl !== "#") {
      // In a real app, you'd likely navigate to a dedicated player page
      // For now, we'll use a toast notification and simulate playback
      toast({
        title: "Playing Movie",
        description: `Now playing: ${featuredMovie.title}`,
      });
      // Example: router.push(`/watch/${featuredMovie.id}`);
    } else {
      toast({
        title: "Playback Error",
        description: "Video URL not available for this movie.",
        variant: "destructive",
      });
    }
  };

  const handleMoreInfos = () => {
    if (featuredMovie.detailsRoute) {
      router.push(featuredMovie.detailsRoute);
    } else {
      toast({
        title: "No Details Page",
        description: `No specific details page defined for ${featuredMovie.title}.`,
      });
    }
  };

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background image/video */}
      <div className="absolute inset-0">
        <Image
          src={featuredMovie.image || "/placeholder.svg"}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-4 md:px-8 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredMovie.title}</h1>

        <div className="flex items-center space-x-4 mb-4">
          <span className="text-green-500 font-semibold">98% Match</span>
          <span>{featuredMovie.year}</span>
          <span>{featuredMovie.rating}</span>
          <span>{featuredMovie.duration}</span>
        </div>

        <p className="text-lg mb-6 text-gray-200 line-clamp-3 md:line-clamp-none">{featuredMovie.description}</p>

        <div className="flex flex-wrap gap-4">
          <Button
            className="bg-white hover:bg-gray-200 text-black font-semibold px-6"
            onClick={handlePlay} // Call the new handlePlay function
          >
            <Play className="mr-2 h-5 w-5" /> Play
          </Button>
          <Button
            variant="secondary"
            className="bg-gray-600/80 hover:bg-gray-600 text-white font-semibold px-6"
            onClick={handleMoreInfos} // Call the new handleMoreInfos function
          >
            <Info className="mr-2 h-5 w-5" /> More Infos
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800/60 hover:bg-gray-800"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}