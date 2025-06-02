"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trash2, Clock, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import { toast } from "@/components/ui/use-toast"

type WatchlistItem = {
  id: string
  title: string
  image: string
  addedAt: string
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedWatchlist = JSON.parse(localStorage.getItem("filmora-watchlist") || "[]")
      setWatchlist(storedWatchlist)
    } catch (error) {
      console.error("Error loading watchlist:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeFromWatchlist = (id: string, title: string) => {
    try {
      const updatedWatchlist = watchlist.filter((item) => item.id !== id)
      localStorage.setItem("filmora-watchlist", JSON.stringify(updatedWatchlist))
      setWatchlist(updatedWatchlist)

      toast({
        title: "Removed from watchlist",
        description: `${title} has been removed from your watchlist.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error removing from watchlist:", error)
      toast({
        title: "Error",
        description: "There was an error updating your watchlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-center py-16 bg-gray-900/50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Your watchlist is empty</h2>
              <p className="text-gray-400 mb-6">
                Add movies and TV shows to your watchlist to keep track of what you want to watch.
              </p>
              <Link href="/">
                <Button className="bg-red-600 hover:bg-red-700">Browse Movies & Shows</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlist.map((item) => (
                <div key={item.id} className="bg-gray-900/50 rounded-lg overflow-hidden flex">
                  <Link
                    href={item.id.startsWith("s") ? `/series/${item.id}` : `/movie/${item.id}`}
                    className="w-1/3 relative"
                  >
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={item.id.startsWith("s") ? `/series/${item.id}` : `/movie/${item.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-red-500 transition-colors">{item.title}</h3>
                    </Link>
                    <div className="text-sm text-gray-400 mb-4 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Added on {formatDate(item.addedAt)}</span>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <Link href={item.id.startsWith("s") ? `/series/${item.id}` : `/movie/${item.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Clock className="mr-2 h-4 w-4" /> Watch Now
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromWatchlist(item.id, item.title)}
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
