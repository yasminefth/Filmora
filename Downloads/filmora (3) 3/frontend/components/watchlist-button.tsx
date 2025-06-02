"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Check, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { addToWatchlist, removeFromWatchlist, getWatchlist } from "@/lib/api"

type WatchlistButtonProps = {
  movieId: string
  movieTitle: string
  movieImage: string
}

export default function WatchlistButton({ movieId, movieTitle, movieImage }: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [watchlistItemId, setWatchlistItemId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in and if movie is in watchlist on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
      return !!token
    }

    const checkWatchlist = async () => {
      try {
        if (checkAuth()) {
          const watchlist = await getWatchlist()
          const watchlistItem = watchlist.find(
            (item: any) => item.watchable_type.includes("Movie") && item.watchable_id.toString() === movieId,
          )

          if (watchlistItem) {
            setIsInWatchlist(true)
            setWatchlistItemId(watchlistItem.id)
          }
        }
      } catch (error) {
        console.error("Error checking watchlist:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkWatchlist()
  }, [movieId])

  const toggleWatchlist = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your watchlist.",
        action: <ToastAction altText="Login">Login</ToastAction>,
      })
      return
    }

    setIsLoading(true)

    try {
      if (isInWatchlist && watchlistItemId) {
        // Remove from watchlist
        await removeFromWatchlist(watchlistItemId)
        setIsInWatchlist(false)
        setWatchlistItemId(null)

        toast({
          title: "Removed from watchlist",
          description: `${movieTitle} has been removed from your watchlist.`,
          variant: "default",
        })
      } else {
        // Add to watchlist
        const response = await addToWatchlist("App\\Models\\Movie", Number.parseInt(movieId))
        setIsInWatchlist(true)
        setWatchlistItemId(response.watchlist.id)

        toast({
          title: "Added to watchlist",
          description: `${movieTitle} has been added to your watchlist.`,
          variant: "default",
          action: <ToastAction altText="View Watchlist">View Watchlist</ToastAction>,
        })
      }
    } catch (error) {
      console.error("Error updating watchlist:", error)
      toast({
        title: "Error",
        description: "There was an error updating your watchlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      className={`${isInWatchlist ? "bg-gray-700" : "bg-gray-800"} hover:bg-gray-700`}
      onClick={toggleWatchlist}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : isInWatchlist ? (
        <Check className="mr-2 h-5 w-5" />
      ) : (
        <Plus className="mr-2 h-5 w-5" />
      )}
      {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
    </Button>
  )
}
