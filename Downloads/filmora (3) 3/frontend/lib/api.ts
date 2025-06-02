const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function for API requests
async function fetchAPI(endpoint: string, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    // Add authorization header if the user is logged in
    ...getAuthHeader(),
    ...(options?.headers || {}),
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Get auth header if user is logged in
function getAuthHeader() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
  return {}
}

// Auth API
export const login = async (email: string, password: string, rememberMe = false) => {
  return fetchAPI("/login", {
    method: "POST",
    body: JSON.stringify({ email, password, remember_me: rememberMe }),
  })
}

export const register = async (name: string, email: string, password: string, password_confirmation: string) => {
  return fetchAPI("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password_confirmation }),
  })
}

export const getUser = async () => {
  return fetchAPI("/user")
}

// Movie API
export const getMovies = async (params = {}) => {
  const queryParams = new URLSearchParams(params as any).toString()
  return fetchAPI(`/movies?${queryParams}`)
}

export const getMovie = async (id: string) => {
  return fetchAPI(`/movies/${id}`)
}

export const getTrendingMovies = async () => {
  return fetchAPI("/movies/trending")
}

export const getPopularMovies = async () => {
  return fetchAPI("/movies/popular")
}

// Series API
export const getSeries = async (params = {}) => {
  const queryParams = new URLSearchParams(params as any).toString()
  return fetchAPI(`/series?${queryParams}`)
}

export const getSeriesSingle = async (id: string) => {
  return fetchAPI(`/series/${id}`)
}

// Actor API
export const getActors = async (params = {}) => {
  const queryParams = new URLSearchParams(params as any).toString()
  return fetchAPI(`/actors?${queryParams}`)
}

export const getActor = async (id: string) => {
  return fetchAPI(`/actors/${id}`)
}

// Genre API
export const getGenres = async () => {
  return fetchAPI("/genres")
}

export const getGenre = async (id: string) => {
  return fetchAPI(`/genres/${id}`)
}

// Watchlist API
export const getWatchlist = async () => {
  return fetchAPI("/watchlist")
}

export const addToWatchlist = async (watchableType: string, watchableId: number) => {
  return fetchAPI("/watchlist", {
    method: "POST",
    body: JSON.stringify({ watchable_type: watchableType, watchable_id: watchableId }),
  })
}

export const removeFromWatchlist = async (id: number) => {
  return fetchAPI(`/watchlist/${id}`, {
    method: "DELETE",
  })
}

// Comments API
export const addComment = async (commentableType: string, commentableId: number, content: string, rating?: number) => {
  return fetchAPI("/comments", {
    method: "POST",
    body: JSON.stringify({ commentable_type: commentableType, commentable_id: commentableId, content, rating }),
  })
}

export const getRelatedMovies = async (id: string) => {
  // Replace this with your real API call
  return [
    {
      id: "2",
      title: "The Dark Knight",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      year: 2008,
      rating: 9.0,
    },
    // ...other mock movies...
  ]
}
