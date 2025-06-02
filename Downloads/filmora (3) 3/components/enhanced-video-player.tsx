"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack } from "lucide-react"

type EnhancedVideoPlayerProps = {
  videoUrl: string
  title: string
  poster: string
  onClose: () => void
}

export default function EnhancedVideoPlayer({ videoUrl, title, poster, onClose }: EnhancedVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [buffering, setBuffering] = useState(false)
  const [showQualityOptions, setShowQualityOptions] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes("youtube.com/embed") || videoUrl.includes("youtu.be")

  // For demo purposes, we'll use a timer to simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Auto-play after loading
      if (!isYouTube) {
        setIsPlaying(true)
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay was prevented
            setIsPlaying(false)
          })
        }
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [videoUrl, isYouTube])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video || isYouTube) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onEnded = () => {
      setIsPlaying(false)
    }

    const onWaiting = () => {
      setBuffering(true)
    }

    const onPlaying = () => {
      setBuffering(false)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("playing", onPlaying)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("playing", onPlaying)
    }
  }, [isYouTube])

  // Handle play/pause
  const togglePlay = () => {
    if (isYouTube) return

    if (isPlaying) {
      videoRef.current?.pause()
    } else {
      videoRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (isYouTube) return

    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Update fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  // Handle seek
  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const playerElement = playerRef.current
    if (playerElement) {
      playerElement.addEventListener("mousemove", handleMouseMove)
      playerElement.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setShowControls(false)
        }
      })
      playerElement.addEventListener("mouseenter", () => {
        setShowControls(true)
      })
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("mousemove", handleMouseMove)
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Skip forward/backward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  return (
    <div
      ref={playerRef}
      className="relative w-full bg-black aspect-video overflow-hidden"
      onDoubleClick={toggleFullscreen}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <div className="text-white text-lg">Loading {title}...</div>
        </div>
      ) : isYouTube ? (
        <iframe
          src={`${videoUrl}?autoplay=1&mute=0&controls=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            poster={poster}
            className="w-full h-full"
            onClick={togglePlay}
            playsInline
          ></video>

          {buffering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Center play/pause button (shows briefly when toggling) */}
          {!isLoading && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isPlaying && !buffering ? "opacity-0" : "opacity-100"
              }`}
            >
              <Button
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          )}

          {/* Controls overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="text-white mr-2">{formatTime(currentTime)}</span>
              <div className="flex-1 mx-2">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-white ml-2">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={skipBackward} className="text-white hover:bg-white/20">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={skipForward} className="text-white hover:bg-white/20">
                  <SkipForward className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2 ml-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <div className="w-24 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowQualityOptions(!showQualityOptions)}
                    className="text-white hover:bg-white/20"
                  >
                    HD
                  </Button>
                  {showQualityOptions && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-md overflow-hidden">
                      <div className="p-2 w-32">
                        <div className="text-white text-sm font-semibold mb-2">Quality</div>
                        <div className="space-y-1">
                          <div className="px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white text-sm flex items-center">
                            <span className="mr-2">•</span> Auto (1080p)
                          </div>
                          <div className="px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white text-sm flex items-center">
                            <span className="mr-2">•</span> 720p
                          </div>
                          <div className="px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white text-sm flex items-center">
                            <span className="mr-2">•</span> 480p
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
