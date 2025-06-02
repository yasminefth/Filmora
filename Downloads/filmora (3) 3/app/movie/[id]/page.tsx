"use client"; // This is the line you requested to add

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ThumbsUp, Share2, Download, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import CommentSection from "@/components/comment-section";
import ActorCard from "@/components/actor-card";
import RelatedMovies from "@/components/related-movies";
import EnhancedVideoPlayer from "@/components/enhanced-video-player";
import WatchlistButton from "@/components/watchlist-button";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";

// This would come from your API in a real app
const movies = [
  {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    year: 2010,
    rating: "PG-13",
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Christopher Nolan",
    image: "inception.jpeg", // Assuming this is 
    // a local image in /public
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0?si=IZ6EKnPU-NPvS5BQ",
    imdbRating: 8.8,
    releaseDate: "July 16, 2010",
    language: "English",
    country: "United States",
    awards: "Won 4 Oscars. 157 wins & 220 nominations total",
    boxOffice: "$292,576,195",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "1",
        name: "Leonardo DiCaprio",
        character: "Dom Cobb",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_.jpg",
      },
      {
        id: "2",
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTY3NTk0NDI3Ml5BMl5BanBnXkFtZTgwNDA3NjY0MjE@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
      },
      {
        id: "3",
        name: "Elliot Page",
        character: "Ariadne",
        image:
          "https://m.media-amazon.com/images/M/MV5BYWY0NzFmYjAtYzMwNC00ODc3LWI2ZWEtOTU3YTM0Y2ZiNTM5XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg",
      },
      {
        id: "4",
        name: "Tom Hardy",
        character: "Eames",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_.jpg",
      },
      {
        id: "5",
        name: "Ken Watanabe",
        character: "Saito",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQzMTUzNjc4Nl5BMl5BanBnXkFtZTcwMTUyODU2Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    rating: "PG-13",
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    starring: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
    image: "darknight.jpg", // Assuming this is a local image in /public
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY?si=p9bSPisXkNKGqwT-",
    imdbRating: 9.0,
    releaseDate: "July 18, 2008",
    language: "English",
    country: "United States",
    awards: "Won 2 Oscars. 159 wins & 163 nominations total",
    boxOffice: "$534,858,444",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "6",
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_.jpg",
      },
      {
        id: "7",
        name: "Heath Ledger",
        character: "Joker",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_.jpg",
      },
      {
        id: "8",
        name: "Aaron Eckhart",
        character: "Harvey Dent",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTc4MTAyNzMzNF5BMl5BanBnXkFtZTcwMzQ5MzQzMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "Parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    year: 2019,
    rating: "R",
    duration: "2h 12m",
    genres: ["Drama", "Thriller"],
    starring: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    director: "Bong Joon Ho",
    image: "/parasite.jpeg", 
    trailerUrl: "https://www.youtube.com/embed/5xH0HfJHsaY?si=MsEPgPz-vceZaeFH",
    imdbRating: 8.5,
    releaseDate: "November 8, 2019",
    language: "Korean",
    country: "South Korea",
    awards: "Won 4 Oscars. 306 wins & 271 nominations total",
    boxOffice: "$53,367,844",
    production: "Neon",
    actors: [
      {
        id: "9",
        name: "Song Kang-ho",
        character: "Ki Taek",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTc4MTAyNzMzNF5BMl5BanBnXkFtZTcwMzQ5MzQzMw@@._V1_.jpg",
      },
      {
        id: "10",
        name: "Lee Sun-kyun",
        character: "Dong Ik",
        image:
          "https://m.media-amazon.com/images/M/MV5BYWFlMmVhZGEtMzNkYi00YTIxLWFkYmEtZGRkODg3ZTkyNTcxXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "4",
    title: "Everything Everywhere All at Once",
    description:
      "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    year: 2022,
    rating: "R",
    duration: "2h 19m",
    genres: ["Action", "Adventure", "Comedy"],
    starring: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    director: "Daniel Kwan, Daniel Scheinert",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/wxN1T1uxQ2g?si=EFgk5nDLXiHYwRcE",
    imdbRating: 7.8,
    releaseDate: "April 8, 2022",
    language: "English, Mandarin, Cantonese",
    country: "United States",
    awards: "Won 7 Oscars. 366 wins & 171 nominations total",
    boxOffice: "$77,147,676",
    production: "A24",
    actors: [
      {
        id: "11",
        name: "Michelle Yeoh",
        character: "Evelyn Wang",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTc3NjY0MTY3N15BMl5BanBnXkFtZTgwNzU0MTQ3MDI@._V1_.jpg",
      },
      {
        id: "12",
        name: "Ke Huy Quan",
        character: "Waymond Wang",
        image:
          "https://m.media-amazon.com/images/M/MV5BZTlkM2U2YWQtMjFmZS00ODk1LWI2ZDktNGUyZjVkN2IxZTc1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      },
    ],
  },
  {
    id: "8",
    title: "Spirited Away",
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    year: 2001,
    rating: "PG",
    duration: "2h 5m",
    genres: ["Animation", "Adventure", "Family"],
    starring: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    director: "Hayao Miyazaki",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/ByXuk9QqQkk?si=5ATkTUNMSFyg7Pqx",
    imdbRating: 8.6,
    releaseDate: "March 28, 2003",
    language: "Japanese",
    country: "Japan",
    awards: "Won 1 Oscar. 58 wins & 31 nominations total",
    boxOffice: "$10,055,859",
    production: "Studio Ghibli",
    actors: [
      {
        id: "13",
        name: "Daveigh Chase",
        character: "Chihiro (voice: English version)",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTgzMjgyNTYwMF5BMl5BanBnXkFtZTcwMTg5NjMwNA@@._V1_.jpg",
      },
      {
        id: "14",
        name: "Miyu Irino",
        character: "Haku (voice)",
        image:
          "https://m.media-amazon.com/images/M/MV5BNWRkMjA0NjctODU0ZS00ZmFiLWIwYzktNThmM2NlOTNiMmZiXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_.jpg",
      },
    ],
  },
  {
    id: "5",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    year: 1972,
    rating: "R",
    duration: "2h 55m",
    genres: ["Crime", "Drama"],
    starring: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/UaVTIH8mujA?si=1qkAf0ObuU_xjU0X",
    imdbRating: 9.2,
    releaseDate: "March 24, 1972",
    language: "English, Italian, Latin",
    country: "United States",
    awards: "Won 3 Oscars. 31 wins & 30 nominations total",
    boxOffice: "$134,966,411",
    production: "Paramount Pictures",
    actors: [
      {
        id: "15",
        name: "Marlon Brando",
        character: "Don Vito Corleone",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTg3MDYyMDE5OF5BMl5BanBnXkFtZTcwNjgyNTEzNA@@._V1_.jpg",
      },
      {
        id: "16",
        name: "Al Pacino",
        character: "Michael Corleone",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_.jpg",
      },
      {
        id: "17",
        name: "James Caan",
        character: "Sonny Corleone",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTI5NjkyNDQ3NV5BMl5BanBnXkFtZTcwNjY5NTQ0Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "6",
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: 1994,
    rating: "R",
    duration: "2h 34m",
    genres: ["Crime", "Drama"],
    starring: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
    image:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/embed/tGpTpVyI_OQ?si=zknm0p022Eilg0oP",
    imdbRating: 8.9,
    releaseDate: "October 14, 1994",
    language: "English, Spanish, French",
    country: "United States",
    awards: "Won 1 Oscar. 70 wins & 75 nominations total",
    boxOffice: "$107,928,762",
    production: "Miramax Films",
    actors: [
      {
        id: "18",
        name: "John Travolta",
        character: "Vincent Vega",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTUwNjQ0ODkxN15BMl5BanBnXkFtZTcwMDc5NjQwNw@@._V1_.jpg",
      },
      {
        id: "19",
        name: "Uma Thurman",
        character: "Mia Wallace",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjMxNzk1MTQyMl5BMl5BanBnXkFtZTgwMDIzMDEyMTE@._V1_.jpg",
      },
      {
        id: "20",
        name: "Samuel L. Jackson",
        character: "Jules Winnfield",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      },
    ],
  },
    {
    id: "7",
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    year: 1999,
    rating: "R",
    duration: "2h 16m",
    genres: ["Action", "Sci-Fi"],
    starring: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "Lana Wachowski, Lilly Wachowski",
    image: "https://image.tmdb.org/t/p/original/f89U3adTNQLtzwmvcaGjSFuKf7s.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    imdbRating: 8.7,
    releaseDate: "March 31, 1999",
    language: "English",
    country: "United States",
    awards: "Won 4 Oscars. 42 wins & 52 nominations total",
    boxOffice: "$465,718,041",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A1",
        name: "Keanu Reeves",
        character: "Neo",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ2NjEwNTc2Nl5BMl5BanBnXkFtZTYwNTM4Mzgx._V1_.jpg",
      },
      {
        id: "A2",
        name: "Laurence Fishburne",
        character: "Morpheus",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0NjcwNTA3N15BMl5BanBnXkFtZTcwNzU2MjEwNA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "9",
    title: "Fight Club",
    description:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    year: 2023,
    rating: "R",
    duration: "3h 0m",
    genres: ["Biography", "Drama", "History"],
    starring: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    director: "Christopher Nolan",
    image: "https://image.tmdb.org/t/p/original/aeWl7hDc9Q4Q0eS3yU1Xq6o4Y6z.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=MVgqj10gXhU",
    imdbRating: 8.6,
    releaseDate: "July 21, 2023",
    language: "English",
    country: "United States",
    awards: "Won 7 Oscars. 351 wins & 220 nominations total",
    boxOffice: "$970,050,470",
    production: "Universal Pictures",
    actors: [
      {
        id: "A3",
        name: "Cillian Murphy",
        character: "J. Robert Oppenheimer",
        image: "https://m.media-amazon.com/images/M/MV5BMTkyNTY1NzAyOF5BMl5BanBnXkFtZTcwNTY4MjQxNA@@._V1_.jpg",
      },
      {
        id: "A4",
        name: "Emily Blunt",
        character: "Kitty Oppenheimer",
        image: "https://m.media-amazon.com/images/M/MV5BMTY3NTUxNTExOV5BMl5BanBnXkFtZTcwOTY0MTY0Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "10",
    title: "Barbie",
    description:
      "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    year: 2023,
    rating: "PG-13",
    duration: "1h 54m",
    genres: ["Adventure", "Comedy", "Fantasy"],
    starring: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    director: "Greta Gerwig",
    image: "https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi5LMisFpYl7s.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=GRmK31z2p9g",
    imdbRating: 7.0,
    releaseDate: "July 21, 2023",
    language: "English",
    country: "United States",
    awards: "Won 1 Oscar. 92 wins & 228 nominations total",
    boxOffice: "$1,445,638,421",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A5",
        name: "Margot Robbie",
        character: "Barbie",
        image: "https://m.media-amazon.com/images/M/MV5BNWY1MTk4ODMtOWMzNy00NzA0LWE0MTQtNjFjNzZkMTAzMTRjXkEyXkFqcGdeQXVyMTExNzQxNzIz._V1_.jpg",
      },
      {
        id: "A6",
        name: "Ryan Gosling",
        character: "Ken",
        image: "https://m.media-amazon.com/images/M/MV5BMjAwMjI4MzYxOV5BMl5BanBnXkFtZTcwMTc0NDU5NA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "11",
    id: "11",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    year: 2001,
    rating: "PG-13",
    duration: "2h 58m",
    genres: ["Action", "Adventure", "Drama"],
    starring: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    director: "Peter Jackson",
    image: "lordofrings.jpeg",
    trailerUrl: "https://www.youtube.com/embed/V75dMMIW2B4",
    imdbRating: 8.8,
    releaseDate: "December 19, 2001",
    language: "English, Sindarin",
    country: "New Zealand, United States",
    awards: "Won 4 Oscars. 123 wins & 133 nominations total",
    boxOffice: "$887,801,626",
    production: "New Line Cinema",
    actors: [
   
      {
        id: "A7",
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ3Nzc0NzIzMV5BMl5BanBnXkFtZTgwNzYwMzU2NzM@._V1_.jpg",
      },
      {
        id: "A8",
        name: "Zendaya",
        character: "Chani",
        image: "https://m.media-amazon.com/images/M/MV5BNTA0MTc1NjM5MV5BMl5BanBnXkFtZTcwMzE4MTMyNw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "12",
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    year: 2022,
    rating: "PG-13",
    duration: "2h 56m",
    genres: ["Action", "Crime", "Drama"],
    starring: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    director: "Matt Reeves",
    image: "https://image.tmdb.org/t/p/original/fZAD1J2gR5h9S0Qj9t10V4SgRzG.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
    imdbRating: 7.8,
    releaseDate: "March 4, 2022",
    language: "English",
    country: "United States",
    awards: "Nominated for 3 Oscars. 52 wins & 171 nominations total",
    boxOffice: "$770,962,583",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A9",
        name: "Robert Pattinson",
        character: "Bruce Wayne / Batman",
        image: "https://m.media-amazon.com/images/M/MV5BMTI5NzMxMzcwNl5BMl5BanBnXkFtZTcwNzY0MzQ2Mw@@._V1_.jpg",
      },
      {
        id: "A10",
        name: "Zoë Kravitz",
        character: "Selina Kyle / Catwoman",
        image: "https://m.media-amazon.com/images/M/MV5BMTY3NTUzNTExOV5BMl5BanBnXkFtZTcwOTY0MTY0Mw@@._V1_.jpg",
      },
    ],
  },
    {
    id: "13",
    title: "Top Gun: Maverick",
    image: "https://image.tmdb.org/t/p/original/6CoRTQETx7bXnQ88S1E86PmtT0b.jpg", // New URL
    trailerUrl: "https://www.youtube.com/embed/IXbnzEHZDPg?si=V1ikQIMKJBTGhT4F",
    imdbRating: 8.7,
    year: 2022,
    duration: "2h 11min",
    genres: ["Action", "Drame"],
    starring: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    director: "Joseph Kosinski",
    releaseDate: "May 27, 2022",
    language: "English",
    country: "United States",
    awards: "Won 1 Oscar. 6 wins & 111 nominations total",
    boxOffice: "$1,488,732,821",
    production: "Paramount Pictures",
    actors: [
      {
        id: "26",
        name: "Tom Cruise",
        character: "Capt. Pete 'Maverick' Mitchell",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_.jpg",
      },
      {
        id: "27",
        name: "Miles Teller",
        character: "Lt. Bradley 'Rooster' Bradshaw",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQ3ODE3Mjg1NV5BMl5BanBnXkFtZTcwNzA2NTY0Mg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "14",
    title: "Avatar: The Way of Water",
    image: "https://image.tmdb.org/t/p/original/t6HIqrREqk7QAQYtqfJQKEer1Y5.jpg", // New URL
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0?si=Tvd2moA9RXMV3Wbt",
    imdbRating: 8.1,
    year: 2022,
    duration: "3h 12min",
    genres: ["Action", "Aventure", "Science-Fiction"],
    description: "Jake Sully vit avec sa nouvelle famille formée sur la planète Pandora...",
    rating: "PG-13",
    starring: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    director: "James Cameron",
    releaseDate: "December 16, 2022",
    language: "English",
    country: "United States",
    awards: "Nominated for 4 Oscars. 12 wins & 63 nominations total",
    boxOffice: "$2,320,250,281",
    production: "20th Century Studios",
    actors: [
      {
        id: "24",
        name: "Sam Worthington",
        character: "Jake Sully",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTc5NzUzNTg1NF5BMl5BanBnXkFtZTcwMjY0NTI4Nw@@._V1_.jpg",
      },
      {
        id: "25",
        name: "Zoe Saldana",
        character: "Neytiri",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTM2MjY0NzA2MV5BMl5BanBnXkFtZTcwMTk1OTY2Nw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "15",
    title: "The Super Mario Bros. Movie",
    description:
      "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    year: 2023,
    rating: "PG",
    duration: "1h 32m",
    genres: ["Animation", "Adventure", "Comedy"],
    starring: ["Chris Pratt", "Charlie Day", "Anya Taylor-Joy"],
    director: "Aaron Horvath, Michael Jelenic",
    image: "https://image.tmdb.org/t/p/original/k1S50XwX9Q04P4pLqYdE2aFqD7R.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=TnGl01MPUIA",
    imdbRating: 7.0,
    releaseDate: "April 5, 2023",
    language: "English",
    country: "United States",
    awards: "1 win & 26 nominations total",
    boxOffice: "$1,361,906,644",
    production: "Universal Pictures",
    actors: [
      {
        id: "A11",
        name: "Chris Pratt",
        character: "Mario (voice)",
        image: "https://m.media-amazon.com/images/M/MV5BMTQzMTA3Mjc3M15BMl5BanBnXkFtZTcwMjE4OTQyNA@@._V1_.jpg",
      },
      {
        id: "A12",
        name: "Anya Taylor-Joy",
        character: "Princess Peach (voice)",
        image: "https://m.media-amazon.com/images/M/MV5BMzQ0NTk2ODcxNl5BMl5BanBnXkFtZTgwNzY1NTc5MjE@._V1_.jpg",
      },
    ],
  },
  {
    id: "16",
    title: "John Wick: Chapter 4",
    description:
      "John Wick uncovers a path to defeating the High Table. But before he can earn his freedom, Wick must face a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    year: 2023,
    rating: "R",
    duration: "2h 49m",
    genres: ["Action", "Crime", "Thriller"],
    starring: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    director: "Chad Stahelski",
    image: "https://image.tmdb.org/t/p/original/vZNE6T7jXwYVwLwJj1R3qG6T1v0.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=qEVUpenm2z0",
    imdbRating: 7.7,
    releaseDate: "March 24, 2023",
    language: "English, Japanese, French",
    country: "United States",
    awards: "1 win & 16 nominations total",
    boxOffice: "$440,147,601",
    production: "Summit Entertainment",
    actors: [
      {
        id: "A13",
        name: "Keanu Reeves",
        character: "John Wick",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ2NjEwNTc2Nl5BMl5BanBnXkFtZTYwNTM4Mzgx._V1_.jpg",
      },
      {
        id: "A14",
        name: "Donnie Yen",
        character: "Caine",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ2NjM3MDk2NV5BMl5BanBnXkFtZTcwMTc4OTk3MQ@@._V1_.jpg",
      },
    ],
  },
   
  {
    id: "17",
    title: "Breaking Bad",
    description:
      "A chemistry teacher diagnosed with lung cancer teams up with a former student to manufacture and sell methamphetamine to secure his family's future.",
    year: 2008,
    rating: "TV-MA",
    duration: "5 Seasons", // Adjusted for TV series
    genres: ["Crime", "Drama", "Thriller"],
    starring: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    director: "Vince Gilligan (Creator)",
    image: "https://image.tmdb.org/t/p/original/ggFHVIfExists.jpg", // Example TV series poster
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXNMF8",
    imdbRating: 9.5,
    releaseDate: "January 20, 2008",
    language: "English",
    country: "United States",
    awards: "Won 16 Primetime Emmys. 289 wins & 454 nominations total",
    boxOffice: "N/A (TV series)", // Adjusted for TV series
    production: "AMC Studios",
    actors: [
      {
        id: "A15",
        name: "Bryan Cranston",
        character: "Walter White",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg",
      },
      {
        id: "A16",
        name: "Aaron Paul",
        character: "Jesse Pinkman",
        image: "https://m.media-amazon.com/images/M/MV5BMTU3MTExNDM4OF5BMl5BanBnXkFtZTcwMzEzODQxOA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "18",
    title: "Stranger Things",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    year: 2016,
    rating: "TV-14",
    duration: "4 Seasons (ongoing)",
    genres: ["Drama", "Fantasy", "Horror"],
    starring: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    director: "The Duffer Brothers (Creators)",
    image: "https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3KU9.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=mflj0o_SgJ8",
    imdbRating: 8.7,
    releaseDate: "July 15, 2016",
    language: "English",
    country: "United States",
    awards: "Won 12 Primetime Emmys. 195 wins & 376 nominations total",
    boxOffice: "N/A (TV series)",
    production: "Netflix",
    actors: [
      {
        id: "A17",
        name: "Millie Bobby Brown",
        character: "Eleven",
        image: "https://m.media-amazon.com/images/M/MV5BYzJjMTBhNmEtYmYzZi00ZmVhLWE1OTctZjZlYzg2OGE3MzRmXkEyXkFqcGdeQXVyMTE0MzQwMjIz._V1_.jpg",
      },
      {
        id: "A18",
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NjY1NDQ3OF5BMl5BanBnXkFtZTcwMDQ4NTc4OA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "19",
    title: "The Crown",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    year: 2016,
    rating: "TV-MA",
    duration: "6 Seasons",
    genres: ["Biography", "Drama", "History"],
    starring: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    director: "Peter Morgan (Creator)",
    image: "https://image.tmdb.org/t/p/original/cTnyFh0jJ10r3z6Uo2uJd25eW5e.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=JWtnJceq0gc",
    imdbRating: 8.7,
    releaseDate: "November 4, 2016",
    language: "English",
    country: "United Kingdom",
    awards: "Won 21 Primetime Emmys. 129 wins & 229 nominations total",
    boxOffice: "N/A (TV series)",
    production: "Netflix",
    actors: [
      {
        id: "A19",
        name: "Olivia Colman",
        character: "Queen Elizabeth II",
        image: "https://m.media-amazon.com/images/M/MV5BMjI2NTk5OTQyNV5BMl5BanBnXkFtZTgwODIzMTk3MjE@._V1_.jpg",
      },
      {
        id: "A20",
        name: "Matt Smith",
        character: "Prince Philip",
        image: "https://m.media-amazon.com/images/M/MV5BMTQwMDc4Mzg2MF5BMl5BanBnXkFtZTcwODAzODIzMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "20",
    title: "The Last of Us",
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    year: 2023,
    rating: "TV-MA",
    duration: "1 Season (ongoing)",
    genres: ["Action", "Adventure", "Drama"],
    starring: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna"],
    director: "Craig Mazin, Neil Druckmann (Creators)",
    image: "https://image.tmdb.org/t/p/original/bL7TzE0W3tQ8D71yv1j1bT35m6S.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=uK1XW1P3R8M",
    imdbRating: 8.8,
    releaseDate: "January 15, 2023",
    language: "English",
    country: "United States",
    awards: "8 wins & 12 nominations total",
    boxOffice: "N/A (TV series)",
    production: "HBO",
    actors: [
      {
        id: "A21",
        name: "Pedro Pascal",
        character: "Joel Miller",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5OTU3MzM4NF5BMl5BanBnXkFtZTcwNjk2NDI4Mg@@._V1_.jpg",
      },
      {
        id: "A22",
        name: "Bella Ramsey",
        character: "Ellie Williams",
        image: "https://m.media-amazon.com/images/M/MV5BNTI0MDk5NjYwOF5BMl5BanBnXkFtZTgwNTU0MjQ3MjE@._V1_.jpg",
      },
    ],
  },
  {
    id: "21",
    title: "Game of Thrones",
    description:
      "Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.",
    year: 2011,
    rating: "TV-MA",
    duration: "8 Seasons",
    genres: ["Action", "Adventure", "Drama"],
    starring: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
    director: "David Benioff, D.B. Weiss (Creators)",
    image: "https://image.tmdb.org/t/p/original/wuqQJgX7rU34m3w2jQoB5F3E1bL.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=rlW_j9m3aJ8",
    imdbRating: 9.2,
    releaseDate: "April 17, 2011",
    language: "English",
    country: "United States",
    awards: "Won 59 Primetime Emmys. 370 wins & 580 nominations total",
    boxOffice: "N/A (TV series)",
    production: "HBO",
    actors: [
      {
        id: "A23",
        name: "Emilia Clarke",
        character: "Daenerys Targaryen",
        image: "https://m.media-amazon.com/images/M/MV5BMjA4NTA5NzU3Nl5BMl5BanBnXkFtZTcwNzU3MjU4Mw@@._V1_.jpg",
      },
      {
        id: "A24",
        name: "Peter Dinklage",
        character: "Tyrion Lannister",
        image: "https://m.media-amazon.com/images/M/MV5BMTgwMzc2NTYwOF5BMl5BanBnXkFtZTcwODMyMjQxOA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "22",
    title: "The Mandalorian",
    description:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    year: 2019,
    rating: "TV-14",
    duration: "3 Seasons (ongoing)",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
    director: "Jon Favreau (Creator)",
    image: "https://image.tmdb.org/t/p/original/eU0Y80qB4iLgfgCgO9j4GjEuxlZ.jpg", // New URL
    trailerUrl: "https://www.youtube.com/watch?v=aOC8E8z_nuI",
    imdbRating: 8.7,
    releaseDate: "November 12, 2019",
    language: "English",
    country: "United States",
    awards: "Won 17 Primetime Emmys. 66 wins & 101 nominations total",
    boxOffice: "N/A (TV series)",
    production: "Disney+",
    actors: [
      {
        id: "A25",
        name: "Pedro Pascal",
        character: "Din Djarin / The Mandalorian",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5OTU3MzM4NF5BMl5BanBnXkFtZTcwNjk2NDI4Mg@@._V1_.jpg",
      },
      {
        id: "A26",
        name: "Giancarlo Esposito",
        character: "Moff Gideon",
        image: "https://m.media-amazon.com/images/M/MV5BMTA5MjA3MzQ3NjZeQTJeQWpwZ15BbWU3MDk4Mjk5MDc@._V1_.jpg",
      },
    ],
  },
  {
    id: "23",
    title: "Wednesday",
    description:
      "Wednesday Addams's attempts to master her emerging psychic ability, thwart a monstrous killing spree, and solve the supernatural mystery that embroiled her parents 25 years ago, all while navigating her new and very tangled relationships at Nevermore Academy.",
    year: 2022,
    rating: "TV-14",
    duration: "1 Season (ongoing)",
    genres: ["Comedy", "Fantasy", "Mystery"],
    starring: ["Jenna Ortega", "Gwendoline Christie", "Riki Lindhome"],
    director: "Tim Burton (Executive Producer)",
    image: "https://image.tmdb.org/t/p/original/oQ29T0QG3fM0qgV1K2Y6y2Z5w7S.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=Q73UvRjPnjk",
    imdbRating: 8.1,
    releaseDate: "November 23, 2022",
    language: "English",
    country: "United States",
    awards: "Nominated for 12 Primetime Emmys. 20 wins & 58 nominations total",
    boxOffice: "N/A (TV series)",
    production: "Netflix",
    actors: [
      {
        id: "A27",
        name: "Jenna Ortega",
        character: "Wednesday Addams",
        image: "https://m.media-amazon.com/images/M/MV5BN2U5MThkMWYtZTRjNy00ZTVkLWFhYzEtOTczYzk4NzY1NjY1XkEyXkFqcGdeQXVyMTE0MzQwMjIz._V1_.jpg",
      },
      {
        id: "A28",
        name: "Gwendoline Christie",
        character: "Larissa Weems",
        image: "https://m.media-amazon.com/images/M/MV5BMTQwMDc4Mzg2MF5BMl5BanBnXkFtZTcwODAzODIzMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "24",
    title: "Succession",
    description:
      "The Roy family, owners of a global media and entertainment conglomerate, is fighting for control of the company amid uncertainty about the health of the family's patriarch, Logan Roy.",
    year: 2018,
    rating: "TV-MA",
    duration: "4 Seasons",
    genres: ["Drama"],
    starring: ["Brian Cox", "Jeremy Strong", "Kieran Culkin"],
    director: "Jesse Armstrong (Creator)",
    image: "https://image.tmdb.org/t/p/original/pX1L5c2h1C0qj0J7S79K4c9F8d6.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=OzYxPzgFvDk",
    imdbRating: 8.9,
    releaseDate: "June 3, 2018",
    language: "English",
    country: "United States",
    awards: "Won 19 Primetime Emmys. 129 wins & 229 nominations total",
    boxOffice: "N/A (TV series)",
    production: "HBO",
    actors: [
      {
        id: "A29",
        name: "Brian Cox",
        character: "Logan Roy",
        image: "https://m.media-amazon.com/images/M/MV5BMjI2NTk5OTQyNV5BMl5BanBnXkFtZTgwODIzMTk3MjE@._V1_.jpg",
      },
      {
        id: "A30",
        name: "Jeremy Strong",
        character: "Kendall Roy",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg",
      },
    ],
  },
  {
    id: "25",
    title: "Mad Max: Fury Road",
    description:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler with the aid of a group of female prisoners, a psychotic worshipper, and a drifter named Max.",
    year: 2015,
    rating: "R",
    duration: "2h 0m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    starring: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    director: "George Miller",
    image: "https://image.tmdb.org/t/p/original/j2h2g4w6k7c2rZz1T0t5WqP9l6.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=hEJnMDf6r_s",
    imdbRating: 8.1,
    releaseDate: "May 15, 2015",
    language: "English",
    country: "Australia, United States",
    awards: "Won 6 Oscars. 240 wins & 220 nominations total",
    boxOffice: "$375,214,000",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A31",
        name: "Tom Hardy",
        character: "Max Rockatansky",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_.jpg",
      },
      {
        id: "A32",
        name: "Charlize Theron",
        character: "Imperator Furiosa",
        image: "https://m.media-amazon.com/images/M/MV5BMTgxNjY3NzA5OF5BMl5BanBnXkFtZTcwMTc0NDQyMQ@@._V1_.jpg",
      },
    ],
  },
  {
    id: "26",
    title: "Mission: Impossible - Dead Reckoning Part One",
    description:
      "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands.",
    year: 2023,
    rating: "PG-13",
    duration: "2h 43m",
    genres: ["Action", "Adventure", "Thriller"],
    starring: ["Tom Cruise", "Hayley Atwell", "Ving Rhames"],
    director: "Christopher McQuarrie",
    image: "https://image.tmdb.org/t/p/original/ApCrD10h119T10P35hS9M24k2fG.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=avz0j_x1i30",
    imdbRating: 7.8,
    releaseDate: "July 12, 2023",
    language: "English",
    country: "United States",
    awards: "6 wins & 17 nominations total",
    boxOffice: "$567,535,383",
    production: "Paramount Pictures",
    actors: [
      {
        id: "A33",
        name: "Tom Cruise",
        character: "Ethan Hunt",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_.jpg",
      },
      {
        id: "A34",
        name: "Hayley Atwell",
        character: "Grace",
        image: "https://m.media-amazon.com/images/M/MV5BMjAwOTI5MjY4M15BMl5BanBnXkFtZTcwNDM2MTQ5Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "27",
    title: "The Raid: Redemption", // Using full title for clarity
    description:
      "A S.W.A.T. team becomes trapped in a 30-story apartment building run by a ruthless drug lord and his army of killers and thugs.",
    year: 2011,
    rating: "R",
    duration: "1h 41m",
    genres: ["Action", "Thriller", "Crime"],
    starring: ["Iko Uwais", "Arifin Putra", "Joe Taslim"],
    director: "Gareth Evans",
    image: "https://image.tmdb.org/t/p/original/jXU3M1zF04Qx1zP5xP9V0zXy1.jpg", // New URL
    trailerUrl: "https://www.youtube.com/watch?v=mE9sV2xY8bM",
    imdbRating: 7.6,
    releaseDate: "March 23, 2012",
    language: "Indonesian",
    country: "Indonesia",
    awards: "25 wins & 22 nominations total",
    boxOffice: "$4,600,000",
    production: "PT Merantau Films",
    actors: [
      {
        id: "A35",
        name: "Iko Uwais",
        character: "Rama",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ2NzE1MzE4M15BMl5BanBnXkFtZTcwNjY0Njk3NA@@._V1_.jpg",
      },
      {
        id: "A36",
        name: "Joe Taslim",
        character: "Jaka",
        image: "https://m.media-amazon.com/images/M/MV5BMTk5NjU2MjQ2N15BMl5BanBnXkFtZTcwMjE0MzQyMw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "28",
    title: "Die Hard",
    description:
      "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
    year: 1988,
    rating: "R",
    duration: "2h 12m",
    genres: ["Action", "Thriller"],
    starring: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"],
    director: "John McTiernan",
    image: "https://image.tmdb.org/t/p/original/yF20P2fR4UvN5Xw9g3Y3K3f84s9.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=jaJuwKkZ-g0",
    imdbRating: 8.2,
    releaseDate: "July 15, 1988",
    language: "English",
    country: "United States",
    awards: "Nominated for 4 Oscars. 10 wins & 12 nominations total",
    boxOffice: "$140,737,132",
    production: "20th Century Fox",
    actors: [
      {
        id: "A37",
        name: "Bruce Willis",
        character: "John McClane",
        image: "https://m.media-amazon.com/images/M/MV5BMTk2NjY2MjUyOV5BMl5BanBnXkFtZTYwNTc5MTQ3._V1_.jpg",
      },
      {
        id: "A38",
        name: "Alan Rickman",
        character: "Hans Gruber",
        image: "https://m.media-amazon.com/images/M/MV5BMTczNTA1OTM4MV5BMl5BanBnXkFtZTcwNjA2NzI3OA@@._V1_.jpg",
      },
    ],
  },
  {
    id: "29",
    title: "Kill Bill: Vol. 1",
    description:
      "After awakening from a four-year coma, a former assassin seeks revenge on her ex-colleagues who tried to kill her and her unborn child.",
    year: 2003,
    rating: "R",
    duration: "1h 51m",
    genres: ["Action", "Crime", "Thriller"],
    starring: ["Uma Thurman", "Lucy Liu", "Vivica A. Fox"],
    director: "Quentin Tarantino",
    image: "https://image.tmdb.org/t/p/original/qrOQ8CgL8bHqVp10yG7WfT3L35L.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=WTnNqKjE2H8",
    imdbRating: 8.2,
    releaseDate: "October 10, 2003",
    language: "English, Japanese",
    country: "United States",
    awards: "30 wins & 89 nominations total",
    boxOffice: "$180,950,477",
    production: "Miramax Films",
    actors: [
      {
        id: "A39",
        name: "Uma Thurman",
        character: "The Bride",
        image: "https://m.media-amazon.com/images/M/MV5BMjMxNzk1MTQyMl5BMl5BanBnXkFtZTgwMDIzMDEyMTE@._V1_.jpg",
      },
      {
        id: "A40",
        name: "Lucy Liu",
        character: "O-Ren Ishii",
        image: "https://m.media-amazon.com/images/M/MV5BMTU2NTQ3MzM5Nl5BMl5BanBnXkFtZTcwMjA3MzA5Mg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "30",
    title: "Gladiator",
    description:
      "A Roman general is betrayed and his family murdered by an emperor's ambitious son. Reduced to slavery, he rises through the ranks of the gladiatorial arena to seek revenge.",
    year: 2000,
    rating: "R",
    duration: "2h 35m",
    genres: ["Action", "Adventure", "Drama"],
    starring: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    director: "Ridley Scott",
    image: "https://image.tmdb.org/t/p/original/sQ9n7f09pL6tV4P9M7JqB36r2sH.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=owK1qxDgmWk",
    imdbRating: 8.5,
    releaseDate: "May 5, 2000",
    language: "English",
    country: "United States",
    awards: "Won 5 Oscars. 54 wins & 94 nominations total",
    boxOffice: "$460,583,966",
    production: "DreamWorks Pictures",
    actors: [
      {
        id: "A41",
        name: "Russell Crowe",
        character: "Maximus",
        image: "https://m.media-amazon.com/images/M/MV5BMTY3NTUxNTExOV5BMl5BanBnXkFtZTcwOTY0MTY0Mw@@._V1_.jpg",
      },
      {
        id: "A42",
        name: "Joaquin Phoenix",
        character: "Commodus",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0NTQ0NjM3OF5BMl5BanBnXkFtZTcwMTA1MzI4MQ@@._V1_.jpg",
      },
    ],
  },
  {
    id: "31",
    title: "Edge of Tomorrow",
    description:
      "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
    year: 2014,
    rating: "PG-13",
    duration: "1h 53m",
    genres: ["Action", "Sci-Fi"],
    starring: ["Tom Cruise", "Emily Blunt"],
    director: "Doug Liman",
    image: "https://image.tmdb.org/t/p/original/j1F1mQ44X5R4w6t1Yd3w2Y3Y3w.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=vw61gBtG-oE",
    imdbRating: 7.9,
    releaseDate: "June 6, 2014",
    language: "English",
    country: "United States",
    awards: "5 wins & 30 nominations total",
    boxOffice: "$370,541,202",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A43",
        name: "Tom Cruise",
        character: "Major William Cage",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_.jpg",
      },
      {
        id: "A44",
        name: "Emily Blunt",
        character: "Rita Vrataski",
        image: "https://m.media-amazon.com/images/M/MV5BMTY3NTUxNTExOV5BMl5BanBnXkFtZTcwOTY0MTY0Mw@@._V1_.jpg",
      },
    ],
  },
  {
    id: "32",
    title: "The Bourne Identity",
    description:
      "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and recover his memory.",
    year: 2002,
    rating: "PG-13",
    duration: "1h 59m",
    genres: ["Action", "Mystery", "Thriller"],
    starring: ["Matt Damon", "Franka Potente", "Chris Cooper"],
    director: "Doug Liman",
    image: "https://image.tmdb.org/t/p/original/uJk7K9F4f7rQ6h8Q0w2k1n5q15T.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=yP5_O1j23B0",
    imdbRating: 7.9,
    releaseDate: "June 14, 2002",
    language: "English",
    country: "United States",
    awards: "11 wins & 17 nominations total",
    boxOffice: "$214,034,296",
    production: "Universal Pictures",
    actors: [
      {
        id: "A45",
        name: "Matt Damon",
        character: "Jason Bourne",
        image: "https://m.media-amazon.com/images/M/MV5BMTI5NjkyNDQ3NV5BMl5BanBnXkFtZTcwNjY5NTQ0Mw@@._V1_.jpg",
      },
      {
        id: "A46",
        name: "Franka Potente",
        character: "Marie Kreutz",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ4NTYzNzc5MF5BMl5BanBnXkFtZTcwODQ0MTU0Mg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "33",
    title: "Superbad",
    description:
      "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to buy alcohol for a party goes awry.",
    year: 2007,
    rating: "R",
    duration: "1h 53m",
    genres: ["Comedy"],
    starring: ["Jonah Hill", "Michael Cera", "Seth Rogen"],
    director: "Greg Mottola",
    image: "https://image.tmdb.org/t/p/original/uS0L7p1Mh7Vf4Y1c7N3p5G5u5K0.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=F0p7pE4U27M",
    imdbRating: 7.6,
    releaseDate: "August 17, 2007",
    language: "English",
    country: "United States",
    awards: "12 wins & 37 nominations total",
    boxOffice: "$170,050,477",
    production: "Columbia Pictures",
    actors: [
      {
        id: "A47",
        name: "Jonah Hill",
        character: "Seth",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      },
      {
        id: "A48",
        name: "Michael Cera",
        character: "Evan",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg",
      },
    ],
  },
  {
    id: "34",
    title: "The Grand Budapest Hotel",
    description:
      "The adventures of Gustave H, a legendary concierge at a famous hotel from the interwar period, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    year: 2014,
    rating: "R",
    duration: "1h 39m",
    genres: ["Adventure", "Comedy", "Drama"],
    starring: ["Ralph Fiennes", "Tony Revolori", "Adrien Brody"],
    director: "Wes Anderson",
    image: "https://image.tmdb.org/t/p/original/i4F1lGk69p3c8E9fVw4Z8z3Z2k2.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=1K5_9bT0Sko",
    imdbRating: 8.1,
    releaseDate: "March 28, 2014",
    language: "English, French, German",
    country: "United States, Germany",
    awards: "Won 4 Oscars. 138 wins & 220 nominations total",
    boxOffice: "$174,800,000",
    production: "Fox Searchlight Pictures",
    actors: [
      {
        id: "A49",
        name: "Ralph Fiennes",
        character: "Monsieur Gustave H.",
        image: "https://m.media-amazon.com/images/M/MV5BMTI5NjkyNDQ3NV5BMl5BanBnXkFtZTcwNjY5NTQ0Mw@@._V1_.jpg",
      },
      {
        id: "A50",
        name: "Tony Revolori",
        character: "Zero Moustafa",
        image: "https://m.media-amazon.com/images/M/MV5BMTQzMzg1ODAyNl5BMl5BanBnXkFtZTYwMjAxODQ1._V1_.jpg",
      },
    ],
  },
  {
    id: "35",
    title: "Bridesmaids",
    description:
      "Competitive maid of honor Lillian (Maya Rudolph) and her bridal party go head to head with the bridesmaid Kristen Wiig (Annie) to throw the perfect wedding.",
    year: 2011,
    rating: "R",
    duration: "2h 5m",
    genres: ["Comedy", "Romance"],
    starring: ["Kristen Wiig", "Maya Rudolph", "Rose Byrne"],
    director: "Paul Feig",
    image: "https://image.tmdb.org/t/p/original/a8wZt4V4o3j2e9J3J2L2L2J2L2.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=r3268G1jH4M",
    imdbRating: 6.8,
    releaseDate: "May 13, 2011",
    language: "English",
    country: "United States",
    awards: "Nominated for 2 Oscars. 27 wins & 67 nominations total",
    boxOffice: "$288,382,900",
    production: "Universal Pictures",
    actors: [
      {
        id: "A51",
        name: "Kristen Wiig",
        character: "Annie Walker",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0NTQ0NjM3OF5BMl5BanBnXkFtZTcwMTA1MzI4MQ@@._V1_.jpg",
      },
      {
        id: "A52",
        name: "Maya Rudolph",
        character: "Lillian Donovan",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5OTU3MzM4NF5BMl5BanBnXkFtZTcwNjk2NDI4Mg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "36",
    title: "Shaun of the Dead",
    description:
      "A man decides to turn his life around by winning back his girlfriend, reconciling with his mother, and dealing with an entire community of zombies.",
    year: 2004,
    rating: "R",
    duration: "1h 39m",
    genres: ["Comedy", "Horror"],
    starring: ["Simon Pegg", "Nick Frost", "Kate Ashfield"],
    director: "Edgar Wright",
    image: "https://image.tmdb.org/t/p/original/zF31d9vS7zVw0xP3Y1L4N2N7P6e.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=e_o8zT-X_a0",
    imdbRating: 7.9,
    releaseDate: "September 24, 2004",
    language: "English",
    country: "United Kingdom",
    awards: "12 wins & 26 nominations total",
    boxOffice: "$30,039,788",
    production: "Universal Pictures",
    actors: [
      {
        id: "A53",
        name: "Simon Pegg",
        character: "Shaun",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      },
      {
        id: "A54",
        name: "Nick Frost",
        character: "Ed",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "37",
    title: "The Hangover",
    description:
      "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They must find their friend before the wedding.",
    year: 2009,
    rating: "R",
    duration: "1h 40m",
    genres: ["Comedy"],
    starring: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
    director: "Todd Phillips",
    image: "https://image.tmdb.org/t/p/original/nL232D2x2W2Z2Q2p3K2D5U2Z2K2w.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=tgjHjZzQ8x4",
    imdbRating: 7.7,
    releaseDate: "June 5, 2009",
    language: "English",
    country: "United States",
    awards: "Won 1 Golden Globe. 24 wins & 37 nominations total",
    boxOffice: "$468,764,000",
    production: "Warner Bros. Pictures",
    actors: [
      {
        id: "A55",
        name: "Bradley Cooper",
        character: "Phil Wenneck",
        image: "https://m.media-amazon.com/images/M/MV5BMTQwMDc4Mzg2MF5BMl5BanBnXkFtZTcwODAzODIzMw@@._V1_.jpg",
      },
      {
        id: "A56",
        name: "Zach Galifianakis",
        character: "Alan Garner",
        image: "https://m.media-amazon.com/images/M/MV5BMjI0NTQ0NjM3OF5BMl5BanBnXkFtZTcwMTA1MzI4MQ@@._V1_.jpg",
      },
    ],
  },
  {
    id: "38",
    title: "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan",
    description:
      "Kazakhstani reporter Borat Sagdiyev is sent to the United States to make a documentary on American culture. Along the way, he offends almost everyone he meets.",
    year: 2006,
    rating: "R",
    duration: "1h 24m",
    genres: ["Comedy"],
    starring: ["Sacha Baron Cohen", "Ken Davitian"],
    director: "Larry Charles",
    image: "https://image.tmdb.org/t/p/original/jXU3M1zF04Qx1zP5xP9V0zXy1.jpg", // Example poster, verify if this specific one works
    trailerUrl: "https://www.youtube.com/watch?v=mC3dEaB-7_0",
    imdbRating: 7.3,
    releaseDate: "November 3, 2006",
    language: "English, Kazakh, Hebrew",
    country: "United States",
    awards: "Nominated for 1 Oscar. 27 wins & 32 nominations total",
    boxOffice: "$262,568,642",
    production: "20th Century Fox",
    actors: [
      {
        id: "A57",
        name: "Sacha Baron Cohen",
        character: "Borat Sagdiyev",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_.jpg",
      },
      {
        id: "A58",
        name: "Ken Davitian",
        character: "Azamat Bagatov",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5OTU3MzM4NF5BMl5BanBnXkFtZTcwNjk2NDI4Mg@@._V1_.jpg",
      },
    ],
  },
  {
    id: "39",
    title: "Airplane!",
    description:
      "A former fighter pilot, traumatized by his past, must take the controls of a commercial airliner when the crew becomes incapacitated.",
    year: 1980,
    rating: "PG",
    duration: "1h 28m",
    genres: ["Comedy"],
    starring: ["Robert Hays", "Julie Hagerty", "Leslie Nielsen"],
    director: "Jim Abrahams, David Zucker, Jerry Zucker",
    image: "https://image.tmdb.org/t/p/original/pX1L5c2h1C0qj0J7S79K4c9F8d6.jpg", // Example poster, verify if this specific one works
    trailerUrl: "https://www.youtube.com/watch?v=07hK7gM9z2w",
    imdbRating: 7.7,
    releaseDate: "July 2, 1980",
    language: "English",
    country: "United States",
    awards: "1 win & 7 nominations total",
    boxOffice: "$83,453,539",
    production: "Paramount Pictures",
    actors: [
      {
        id: "A59",
        name: "Leslie Nielsen",
        character: "Dr. Rumack",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      },
      {
        id: "A60",
        name: "Robert Hays",
        character: "Ted Striker",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg",
      },
    ],
  },
  {
    id: "40",
    title: "Dumb and Dumber",
    description:
      "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend embark on a cross-country trip to return it to her.",
    year: 1994,
    rating: "PG-13",
    duration: "1h 47m",
    genres: ["Comedy"],
    starring: ["Jim Carrey", "Jeff Daniels", "Lauren Holly"],
    director: "Peter Farrelly",
    image: "https://image.tmdb.org/t/p/original/jXU3M1zF04Qx1zP5xP9V0zXy1.jpg", // Example poster, verify if this specific one works
    trailerUrl: "https://www.youtube.com/watch?v=l1yv_QJ5M8Y",
    imdbRating: 7.3,
    releaseDate: "December 16, 1994",
    language: "English",
    country: "United States",
    awards: "3 wins & 4 nominations total",
    boxOffice: "$247,275,374",
    production: "New Line Cinema",
    actors: [
      {
        id: "A61",
        name: "Jim Carrey",
        character: "Lloyd Christmas",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg",
      },
      {
        id: "A62",
        name: "Jeff Daniels",
        character: "Harry Dunne",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      },
    ],
  },
];

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrailer, setIsTrailer] = useState(false);
  const { toast } = useToast();

  // Debug logging
  console.log('Current movie ID:', id, 'Type:', typeof id);

  // Find movie with proper type conversion
  const movie = movies.find((m) => m.id.toString() === id);
  
  console.log('Found movie:', movie);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold mt-20">Movie not found</h1>
        <p className="text-gray-400 mt-4">
          Sorry, we couldn't find the movie you're looking for.
        </p>
        <Link href="/" className="mt-8 underline text-blue-400">
          Go back home
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: movie.title,
          text: `Check out ${movie.title} on Filmora`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Movie link copied to clipboard",
        });
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        {isPlaying ? (
          <div className="relative">
            <EnhancedVideoPlayer
              videoUrl={isTrailer || !movie.videoUrl ? movie.trailerUrl : movie.videoUrl}
              title={movie.title}
              poster={movie.image}
              onClose={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => {
                  setIsTrailer(!movie.videoUrl);
                  setIsPlaying(true);
                }}
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Movie details */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">{movie.imdbRating}</span>
                  <span className="text-gray-400 ml-1">/10</span>
                </div>
                <span>{movie.year}</span>
                <span>{movie.rating}</span>
                <span>{movie.duration}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre, index) => (
                  <Link
                    key={index}
                    href={`/genres/${genre.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setIsTrailer(!movie.videoUrl);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600"
                  onClick={() => {
                    setIsTrailer(true);
                    setIsPlaying(true);
                  }}
                >
                  <Play className="mr-2 h-5 w-5 text-black" /> Watch Trailer
                </Button>
                <WatchlistButton
                  movieId={movie.id}
                  movieTitle={movie.title}
                  movieImage={movie.image}
                />
                <Button
                  variant="outline"
                  className="border-gray-600"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5 text-black" /> Share
                </Button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-300">{movie.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <h3 className="text-gray-400">Director</h3>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Release Date</h3>
                  <p>{movie.releaseDate}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Language</h3>
                  <p>{movie.language}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Country</h3>
                  <p>{movie.country}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Production</h3>
                  <p>{movie.production}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Box Office</h3>
                  <p>{movie.boxOffice}</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Awards</h2>
                <p className="text-gray-300">{movie.awards}</p>
              </div>

              {/* Cast section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.actors?.map((actor) => (
                    <ActorCard key={actor.id} actor={actor} />
                  ))}
                </div>
              </div>

              {/* Comments section */}
              <CommentSection movieId={movie.id} movieTitle={movie.title} />
            </div>

            <div>
              {/* Related movies */}
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <RelatedMovies
                currentMovieId={movie.id}
                relatedMovies={movies.filter((m) => m.id !== movie.id)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}