"use client"

import { useState, useEffect } from "react"

type VideoPlayerProps = {
  videoUrl: string
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes("youtube.com/embed") || videoUrl.includes("youtu.be")

  return (
    <div className="w-full bg-black aspect-video relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      )}

      {isYouTube ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      ) : (
        <video
          src={videoUrl}
          className="w-full h-full"
          controls
          autoPlay
          onLoadedData={() => setIsLoading(false)}
        ></video>
      )}
    </div>
  )
}
