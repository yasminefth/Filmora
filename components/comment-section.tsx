"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Flag, Star } from "lucide-react"

type Comment = {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  text: string
  date: string
  likes: number
  dislikes: number
  rating?: number
  replies: Omit<Comment, "replies">[]
}

type CommentSectionProps = {
  movieId: string
  movieTitle: string
}

export default function CommentSection({ movieId, movieTitle }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userComments, setUserComments] = useState<Comment[]>([])
  const [hoveredStar, setHoveredStar] = useState(0)

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem(`filmora-comments-${movieId}`)
    if (savedComments) {
      setUserComments(JSON.parse(savedComments))
    }
  }, [movieId])

  // This would come from your API in a real app
  const existingComments: Comment[] = [
    {
      id: "1",
      user: {
        id: "user1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      text: "One of the best movies I've ever seen. The concept is mind-blowing and the execution is flawless. Christopher Nolan is a genius!",
      date: "2 months ago",
      likes: 42,
      dislikes: 3,
      rating: 5,
      replies: [
        {
          id: "reply1",
          user: {
            id: "user2",
            name: "Jane Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          },
          text: "I agree! The visual effects were groundbreaking for its time.",
          date: "1 month ago",
          likes: 12,
          dislikes: 0,
          rating: 4,
        },
      ],
    },
    {
      id: "2",
      user: {
        id: "user3",
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      text: "The soundtrack by Hans Zimmer perfectly complements the movie. I still get chills when I hear 'Time'.",
      date: "3 weeks ago",
      likes: 28,
      dislikes: 1,
      rating: 5,
      replies: [],
    },
    {
      id: "3",
      user: {
        id: "user4",
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      text: "I've watched this movie at least 5 times and I still notice new details each time. The layers of storytelling are incredible.",
      date: "1 week ago",
      likes: 15,
      dislikes: 0,
      rating: 4,
      replies: [],
    },
  ]

  const allComments = [...userComments, ...existingComments]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment: Comment = {
      id: `user-${Date.now()}`,
      user: {
        id: "current-user",
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
      text: comment,
      date: "Just now",
      likes: 0,
      dislikes: 0,
      rating: rating,
      replies: [],
    }

    const updatedComments = [newComment, ...userComments]
    setUserComments(updatedComments)

    // Save to localStorage
    localStorage.setItem(`filmora-comments-${movieId}`, JSON.stringify(updatedComments))

    // Reset form
    setComment("")
    setRating(0)
  }

  const handleLike = (commentId: string) => {
    const updatedComments = userComments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 }
      }
      return comment
    })
    setUserComments(updatedComments)
    localStorage.setItem(`filmora-comments-${movieId}`, JSON.stringify(updatedComments))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Comments & Reviews</h2>

      {/* Comment form */}
      <div className="mb-8">
        {isLoggedIn ? (
          <form onSubmit={handleSubmitComment}>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="Your avatar" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-2 flex items-center">
                  <div className="mr-2">Your rating:</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= (hoveredStar || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder={`Share your thoughts about ${movieTitle}...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-800 border-gray-700 resize-none mb-2"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setComment("")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!comment.trim()}>
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="mb-2">Sign in to add a comment</p>
            <Button onClick={() => setIsLoggedIn(true)}>Sign In</Button>
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {allComments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main comment */}
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                  {comment.rating && (
                    <div className="flex items-center ml-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= comment.rating! ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-gray-200 mb-2">{comment.text}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <button className="flex items-center gap-1 hover:text-white" onClick={() => handleLike(comment.id)}>
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-white">
                    <ThumbsDown className="h-4 w-4" />
                    <span>{comment.dislikes}</span>
                  </button>
                  <button className="hover:text-white">Reply</button>
                  <button className="ml-auto hover:text-white">
                    <Flag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-14 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                      <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{reply.user.name}</span>
                        <span className="text-xs text-gray-400">{reply.date}</span>
                        {reply.rating && (
                          <div className="flex items-center ml-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= reply.rating! ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-200 mb-2">{reply.text}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-white">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{reply.dislikes}</span>
                        </button>
                        <button className="ml-auto hover:text-white">
                          <Flag className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
