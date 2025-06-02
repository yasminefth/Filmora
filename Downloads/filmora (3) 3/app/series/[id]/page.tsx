
  "use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ThumbsUp, Share2, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import CommentSection from "@/components/comment-section"
import EnhancedVideoPlayer from "@/components/enhanced-video-player"
import WatchlistButton from "@/components/watchlist-button"
import { toast as useToast } from "@/components/ui/use-toast"

// This would come from your API in a real app
const series = [
  {
    id: "s1",
    title: "Breaking Bad",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    year: "2008-2013",
    rating: "TV-MA",
    seasons: 5,
    episodeCount: 62,
    genres: ["Crime", "Drama", "Thriller"],
    starring: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    creator: "Vince Gilligan",
    image:
      "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/HhesaQXLuRY?si=UrfTCgSkbJkpuky7", 
    imdbRating: 9.5,
    network: "AMC",
    language: "English",
    country: "United States",
    awards: "Won 16 Primetime Emmys. 152 wins & 238 nominations total",
    actors: [
      {
        id: "s1a1",
        name: "Bryan Cranston",
        character: "Walter White",
        image: "https://m.media-amazon.com/images/M/MV5BMTA2NjEyMTY4MTVeQTJeQWpwZ15BbWU3MDQ5NDAzNDc@._V1_.jpg",
      },
      {
        id: "s1a2",
        name: "Aaron Paul",
        character: "Jesse Pinkman",
        image: "https://m.media-amazon.com/images/M/MV5BMTY1OTY5NjI5NV5BMl5BanBnXkFtZTcwODA4MjM0OA@@._V1_.jpg",
      },
      {
        id: "s1a3",
        name: "Anna Gunn",
        character: "Skyler White",
        image: "https://m.media-amazon.com/images/M/MV5BMTU0NTk3MDQ3OV5BMl5BanBnXkFtZTcwNDY3NzQ4Mg@@._V1_.jpg",
      },
      {
        id: "s1a4",
        name: "Dean Norris",
        character: "Hank Schrader",
        image: "https://m.media-amazon.com/images/M/MV5BMTk3Nzg1MTI5OF5BMl5BanBnXkFtZTcwMjc5NzI5Mg@@._V1_.jpg",
      },
      {
        id: "s1a5",
        name: "Bob Odenkirk",
        character: "Saul Goodman",
        image:
          "https://m.media-amazon.com/images/M/MV5BOWM5MDJjYTItMTRkNC00NTQ4LThkNjUtNDY3Mzk0YWMwMTBhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s1e1",
        title: "Pilot",
        season: 1,
        episode: 1,
        description:
          "A high school chemistry teacher is diagnosed with terminal lung cancer and turns to a life of crime.",
        duration: "58m",
        image:
          "https://m.media-amazon.com/images/M/MV5BNTZlMGY1OWItZWJiMy00MTZlLThhMGItNDQ2ODM3YTNjNzRiXkEyXkFqcGdeQXVyNzgyOTQ4MDc@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s1e2",
        title: "Cat's in the Bag...",
        season: 1,
        episode: 2,
        description: "Walt and Jesse attempt to dispose of the bodies of two rivals, but fail to do so.",
        duration: "48m",
        image: "https://m.media-amazon.com/images/M/MV5BMTk1MzU5MzIwMl5BMl5BanBnXkFtZTgwNjA5Njk5MjE@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s1e3",
        title: "...And the Bag's in the River",
        season: 1,
        episode: 3,
        description: "Walt and Jesse clean up the mess they made, and Walt struggles with the decision to kill or not.",
        duration: "48m",
        image: "https://m.media-amazon.com/images/M/MV5BMTcxMDU5NTY5NF5BMl5BanBnXkFtZTgwNzA5Njk5MjE@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
    ],
  },
  {
    id: "s2",
    title: "Stranger Things",
    description:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    year: "2016-Present",
    rating: "TV-14",
    seasons: 4,
    episodeCount: 34,
    genres: ["Drama", "Fantasy", "Horror"],
    starring: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    creator: "The Duffer Brothers",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/QlYrNC_1Xmk?si=gZRYM8IW-idG3Y_l", // Stranger Things trailer
    imdbRating: 8.7,
    network: "Netflix",
    language: "English",
    country: "United States",
    awards: "Won 7 Primetime Emmys. 94 wins & 247 nominations total",
    actors: [
      {
        id: "s2a1",
        name: "Millie Bobby Brown",
        character: "Eleven",
        image: "https://m.media-amazon.com/images/M/MV5BMjA5NzA0NzQzMF5BMl5BanBnXkFtZTgwMTQxNjUzNjM@._V1_.jpg",
      },
      {
        id: "s2a2",
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        image:
          "https://m.media-amazon.com/images/M/MV5BNzAyOTNjOTUtYTdiNS00ZmM1LTk0ZTQtZTY2ZTNlMzgwYTQwXkEyXkFqcGdeQXVyNjY5NDgzNjQ@._V1_.jpg",
      },
      {
        id: "s2a3",
        name: "Winona Ryder",
        character: "Joyce Byers",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ3NzM3MTc2NF5BMl5BanBnXkFtZTcwODMxNjA0NA@@._V1_.jpg",
      },
      {
        id: "s2a4",
        name: "David Harbour",
        character: "Jim Hopper",
        image:
          "https://m.media-amazon.com/images/M/MV5BNDEyODM0OTgtN2MwNS00ZDJjLWFmOWUtNzFiZGJlZDFjNTA1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      },
      {
        id: "s2a5",
        name: "Gaten Matarazzo",
        character: "Dustin Henderson",
        image: "https://m.media-amazon.com/images/M/MV5BNTczMzc4NDY0MF5BMl5BanBnXkFtZTgwNjY1NzQ0NTM@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s2e1",
        title: "Chapter One: The Vanishing of Will Byers",
        season: 1,
        episode: 1,
        description:
          "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
        duration: "49m",
        image: "https://m.media-amazon.com/images/M/MV5BMTUzNTU5MjM5Ml5BMl5BanBnXkFtZTgwODAwMDI4OTE@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s2e2",
        title: "Chapter Two: The Weirdo on Maple Street",
        season: 1,
        episode: 2,
        description:
          "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
        duration: "56m",
        image: "https://m.media-amazon.com/images/M/MV5BMTgzNjA2NDYyOF5BMl5BanBnXkFtZTgwOTAwMDI4OTE@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s2e3",
        title: "Chapter Three: Holly, Jolly",
        season: 1,
        episode: 3,
        description:
          "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
        duration: "52m",
        image: "https://m.media-amazon.com/images/M/MV5BMTgzNjA2NDYyOF5BMl5BanBnXkFtZTgwOTAwMDI4OTE@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
    ],
  },
  {
    id: "s3",
    title: "The Crown",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    year: "2016-2023",
    rating: "TV-MA",
    seasons: 6,
    episodeCount: 60,
    genres: ["Biography", "Drama", "History"],
    starring: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    creator: "Peter Morgan",
    image:
      "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/JWtnJjn6ng0?si=PKsrstpd8eOSor5Z" , // The Crown trailer
    imdbRating: 8.7,
    network: "Netflix",
    language: "English",
    country: "United Kingdom",
    awards: "Won 21 Primetime Emmys. 93 wins & 251 nominations total",
    actors: [
      {
        id: "s3a1",
        name: "Claire Foy",
        character: "Queen Elizabeth II (Seasons 1-2)",
        image:
          "https://m.media-amazon.com/images/M/MV5BZmYxZjE4ODYtYjU4ZC00NDgzLWIxZjctODZkNjg4MGFjNWZiXkEyXkFqcGdeQXVyMTM1MjAxMDc3._V1_.jpg",
      },
      {
        id: "s3a2",
        name: "Olivia Colman",
        character: "Queen Elizabeth II (Seasons 3-4)",
        image:
          "https://m.media-amazon.com/images/M/MV5BZWEzMGY4OTQtYTdmMy00M2QwLTliYTQtYWUzYzc3OTA5YzIwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
      },
      {
        id: "s3a3",
        name: "Imelda Staunton",
        character: "Queen Elizabeth II (Seasons 5-6)",
        image: "https://m.media-amazon.com/images/M/MV5BMTYxNzc0NjI3N15BMl5BanBnXkFtZTcwMzUxMzM3Mw@@._V1_.jpg",
      },
      {
        id: "s3a4",
        name: "Matt Smith",
        character: "Prince Philip, Duke of Edinburgh (Seasons 1-2)",
        image: "https://m.media-amazon.com/images/M/MV5BMTUxNjQ4MjU5Ml5BMl5BanBnXkFtZTcwMTU2NjE0Nw@@._V1_.jpg",
      },
      {
        id: "s3a5",
        name: "Tobias Menzies",
        character: "Prince Philip, Duke of Edinburgh (Seasons 3-4)",
        image: "https://m.media-amazon.com/images/M/MV5BMTUzMjg1NjgyMl5BMl5BanBnXkFtZTgwMzg1NTcwNDI@._V1_.jpg",
      },
    ],
    episodes: [
      {
        id: "s3e1",
        title: "Wolferton Splash",
        season: 1,
        episode: 1,
        description:
          "A young Princess Elizabeth marries Prince Philip. As King George VI's health worsens, Winston Churchill is elected prime minister for the second time.",
        duration: "57m",
        image: "https://m.media-amazon.com/images/M/MV5BMTU4Mzk3ODIyOV5BMl5BanBnXkFtZTgwODgyNzk2MDI@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s3e2",
        title: "Hyde Park Corner",
        season: 1,
        episode: 2,
        description:
          "With King George too ill to travel, Elizabeth and Philip embark on a four-continent Commonwealth tour. Party leaders attempt to undermine Churchill.",
        duration: "61m",
        image: "https://m.media-amazon.com/images/M/MV5BMjE1MTk5NDQ5Nl5BMl5BanBnXkFtZTgwOTgyNzk2MDI@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
      {
        id: "s3e3",
        title: "Windsor",
        season: 1,
        episode: 3,
        description:
          "With Elizabeth in a new role, Philip tries to assert some power. Churchill wants to delay the coronation. King George's disgraced brother arrives.",
        duration: "59m",
        image: "https://m.media-amazon.com/images/M/MV5BMjE1MTk5NDQ5Nl5BMl5BanBnXkFtZTgwOTgyNzk2MDI@._V1_.jpg",
        videoUrl:
          "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
      },
    ],
  },
  {
    id: "s4",
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    year: "2011-2019",
    rating: "TV-MA",
    seasons: 8,
    episodeCount: 73,
    genres: ["Action", "Adventure", "Drama"],
    starring: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
    creator: "David Benioff, D.B. Weiss",
    image: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMDAwMTY@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/KPLWWIOCOOQ?si=Le0V9bz83q_-1CgI" ,
    imdbRating: 9.2,
    network: "HBO",
    language: "English",
    country: "United States",
    awards: "Won 59 Primetime Emmys. 370 wins & 580 nominations total",
    actors: [
      {
        id: "s4a1",
        name: "Emilia Clarke",
        character: "Daenerys Targaryen",
        image: "https://m.media-amazon.com/images/M/MV5BNjk0Nzk3NGQtMjY3Ni00NWQ4LTk2ZTAtYzA0OTVmZThjOTJkXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg"
      },
      {
        id: "s4a2",
        name: "Kit Harington",
        character: "Jon Snow",
        image: "https://m.media-amazon.com/images/M/MV5BMTk4MDk1NDkzNV5BMl5BanBnXkFtZTcwNjY2NDk0Nw@@._V1_.jpg"
      },
      {
        id: "s4a3",
        name: "Peter Dinklage",
        character: "Tyrion Lannister",
        image: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s4e1",
        title: "Winter Is Coming",
        season: 1,
        episode: 1,
        description: "Eddard Stark is torn between his family and an old friend when asked to serve at the side of King Robert Baratheon.",
        duration: "62m",
        image: "https://m.media-amazon.com/images/M/MV5BMTQwNDg1MDA4M15BMl5BanBnXkFtZTgwMjE1NjQxMjE@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      },
      {
        id: "s4e2",
        title: "The Kingsroad",
        season: 1,
        episode: 2,
        description: "While Bran recovers from his fall, Ned takes only his daughters to King's Landing. Jon Snow goes with his uncle Benjen to the Wall.",
        duration: "56m",
        image: "https://m.media-amazon.com/images/M/MV5BMTk2OTY5MzcwMV5BMl5BanBnXkFtZTgwMjE1NjQxMjE@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s5",
    title: "The Office (US)",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    year: "2005-2013",
    rating: "TV-14",
    seasons: 9,
    episodeCount: 201,
    genres: ["Comedy"],
    starring: ["Steve Carell", "John Krasinski", "Jenna Fischer"],
    creator: "Greg Daniels",
    image: "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/-C2z-nshFts?si=uzoj1RM17CBLhIYx" ,
    imdbRating: 8.9,
    network: "NBC",
    language: "English",
    country: "United States",
    awards: "Won 5 Primetime Emmys. 42 wins & 152 nominations total",
    actors: [
      {
        id: "s5a1",
        name: "Steve Carell",
        character: "Michael Scott",
        image: "https://m.media-amazon.com/images/M/MV5BMjQyMjczMjQ1M15BMl5BanBnXkFtZTgwNDczNTMzNjE@._V1_.jpg"
      },
      {
        id: "s5a2",
        name: "John Krasinski",
        character: "Jim Halpert",
        image: "https://m.media-amazon.com/images/M/MV5BMTc3MzY3MjA3OF5BMl5BanBnXkFtZTcwODI3NjQxMw@@._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s5e1",
        title: "Pilot",
        season: 1,
        episode: 1,
        description: "A documentary crew follows the everyday lives of the employees at Dunder Mifflin Paper Company in Scranton, Pennsylvania.",
        duration: "23m",
        image: "https://m.media-amazon.com/images/M/MV5BMTUwNjQ0ODkxN15BMl5BanBnXkFtZTgwMDc5NjQwNw@@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s6",
    title: "Friends",
    description: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    year: "1994-2004",
    rating: "TV-14",
    seasons: 10,
    episodeCount: 236,
    genres: ["Comedy", "Romance"],
    starring: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow"],
    creator: "David Crane, Marta Kauffman",
    image: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/Zg2LCD5QOJs?si=0RZv-n8-35O1bu32",
    imdbRating: 8.9,
    network: "NBC",
    language: "English",
    country: "United States",
    awards: "Won 6 Primetime Emmys. 77 wins & 220 nominations total",
    actors: [
      {
        id: "s6a1",
        name: "Jennifer Aniston",
        character: "Rachel Green",
        image: "https://m.media-amazon.com/images/M/MV5BNjk1MjIxNjUxNF5BMl5BanBnXkFtZTcwODk2NzM4Mg@@._V1_.jpg"
      },
      {
        id: "s6a2",
        name: "Courteney Cox",
        character: "Monica Geller",
        image: "https://m.media-amazon.com/images/M/MV5BMTQzMDk1ODI2M15BMl5BanBnXkFtZTYwNjMyNDk4._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s6e1",
        title: "The One Where Monica Gets a Roommate",
        season: 1,
        episode: 1,
        description: "Monica and the gang introduce Rachel to the real world after she leaves her fiancé at the altar.",
        duration: "22m",
        image: "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s7",
    title: "The Wire",
    description: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement.",
    year: "2002-2008",
    rating: "TV-MA",
    seasons: 5,
    episodeCount: 60,
    genres: ["Crime", "Drama", "Thriller"],
    starring: ["Dominic West", "Lance Reddick", "Idris Elba"],
    creator: "David Simon",
    image: "https://m.media-amazon.com/images/M/MV5BNTllYzFhMjAtZjExNS00MjM4LWE5YmMtOGFiZGRlOTU5YzJiXkEyXkFqcGdeQXVyNDIzMDAwMTY@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/1S5khOZ1wBs?si=Fof1Q3N3ZeOOAoeY",
    imdbRating: 9.3,
    network: "HBO",
    language: "English",
    country: "United States",
    awards: "Nominated for 2 Primetime Emmys. 22 wins & 42 nominations total",
    actors: [
      {
        id: "s7a1",
        name: "Dominic West",
        character: "Jimmy McNulty",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ5MjAwMTY2M15BMl5BanBnXkFtZTYwODgyMDUx._V1_.jpg"
      },
      {
        id: "s7a2",
        name: "Idris Elba",
        character: "Stringer Bell",
        image: "https://m.media-amazon.com/images/M/MV5BNzEzMTI2NjEyNF5BMl5BanBnXkFtZTcwNTA0OTE4OA@@._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s7e1",
        title: "The Target",
        season: 1,
        episode: 1,
        description: "Baltimore Det. James McNulty finds himself in hot water with his superior Major William Rawls after a drug dealer is acquitted.",
        duration: "58m",
        image: "https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTgwMDI5MjE5MTE@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s8",
    title: "The Sopranos",
    description: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.",
    year: "1999-2007",
    rating: "TV-MA",
    seasons: 6,
    episodeCount: 86,
    genres: ["Crime", "Drama"],
    starring: ["James Gandolfini", "Lorraine Bracco", "Edie Falco"],
    creator: "David Chase",
    image: "https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/Q8cBFvpqmH0?si=7ogA0uCeYfrF4yNw",
    imdbRating: 9.2,
    network: "HBO",
    language: "English",
    country: "United States",
    awards: "Won 21 Primetime Emmys. 118 wins & 309 nominations total",
    actors: [
      {
        id: "s8a1",
        name: "James Gandolfini",
        character: "Tony Soprano",
        image: "https://m.media-amazon.com/images/M/MV5BMTI1MTc0NDQxNV5BMl5BanBnXkFtZTcwODUyOTcyMQ@@._V1_.jpg"
      },
      {
        id: "s8a2",
        name: "Edie Falco",
        character: "Carmela Soprano",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s8e1",
        title: "The Sopranos",
        season: 1,
        episode: 1,
        description: "Tony Soprano, a New Jersey mob boss, seeks psychiatric counseling after suffering from panic attacks.",
        duration: "58m",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s9",
    title: "Peaky Blinders",
    description: "A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world.",
    year: "2013-2022",
    rating: "TV-MA",
    seasons: 6,
    episodeCount: 36,
    genres: ["Crime", "Drama"],
    starring: ["Cillian Murphy", "Paul Anderson", "Helen McCrory"],
    creator: "Steven Knight",
    image: "https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/oVzVdvGIC7U?si=Cy6XIRdG8EuIdcaR",
    imdbRating: 8.8,
    network: "BBC Two",
    language: "English",
    country: "United Kingdom",
    awards: "Nominated for 2 BAFTA Awards. 12 wins & 42 nominations total",
    actors: [
      {
        id: "s9a1",
        name: "Cillian Murphy",
        character: "Thomas Shelby",
        image: "https://m.media-amazon.com/images/M/MV5BZTk5ZGQ0OGQtYWYwMy00ZTE1LWE0NWUtMTQ2MmYxMWUxZWM3XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg"
      },
      {
        id: "s9a2",
        name: "Helen McCrory",
        character: "Polly Gray",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s9e1",
        title: "Episode 1",
        season: 1,
        episode: 1,
        description: "In 1919 Birmingham, England, Tommy Shelby and his Peaky Blinders gang enter the world of racecourse racketeering.",
        duration: "58m",
        image: "https://m.media-amazon.com/images/M/MV5BMTkzNjEzMDEzMF5BMl5BanBnXkFtZTgwMDI0MjE4MjE@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s10",
    title: "Chernobyl",
    description: "In April 1986, an explosion at the Chernobyl nuclear power plant in the USSR becomes one of the world's worst man-made catastrophes.",
    year: "2019",
    rating: "TV-MA",
    seasons: 1,
    episodeCount: 5,
    genres: ["Drama", "History", "Thriller"],
    starring: ["Jared Harris", "Stellan Skarsgård", "Emily Watson"],
    creator: "Craig Mazin",
    image: "https://m.media-amazon.com/images/M/MV5BZGQ2YmMxZmEtYjI5OS00NzlkLTlkNTEtYWMyMzkyMzc2MDU5XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/oUqtzjoRPks?si=7KD77dN7DSzxnIpL",
    imdbRating: 9.4,
    network: "HBO",
    language: "English",
    country: "United States, United Kingdom",
    awards: "Won 10 Primetime Emmys. 52 wins & 101 nominations total",
    actors: [
      {
        id: "s10a1",
        name: "Jared Harris",
        character: "Valery Legasov",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      },
      {
        id: "s10a2",
        name: "Stellan Skarsgård",
        character: "Boris Shcherbina",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s10e1",
        title: "1:23:45",
        season: 1,
        episode: 1,
        description: "April 26, 1986, Ukrainian SSR. Plant workers and firefighters put their lives on the line to control a catastrophic explosion.",
        duration: "65m",
        image: "https://m.media-amazon.com/images/M/MV5BZGQ2YmMxZmEtYjI5OS00NzlkLTlkNTEtYWMyMzkyMzc2MDU5XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s11",
    title: "Westworld",
    description: "Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged.",
    year: "2016-2022",
    rating: "TV-MA",
    seasons: 4,
    episodeCount: 36,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    starring: ["Evan Rachel Wood", "Thandiwe Newton", "Jeffrey Wright"],
    creator: "Jonathan Nolan, Lisa Joy",
    image: "https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcxMGE5YTUxXkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/kEkZdgWu7mM?si=453NkZ7h3bAeXydO" ,
    imdbRating: 8.6,
    network: "HBO",
    language: "English",
    country: "United States",
    awards: "Won 9 Primetime Emmys. 54 wins & 223 nominations total",
    actors: [
      {
        id: "s11a1",
        name: "Evan Rachel Wood",
        character: "Dolores Abernathy",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      },
      {
        id: "s11a2",
        name: "Thandiwe Newton",
        character: "Maeve Millay",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s11e1",
        title: "The Original",
        season: 1,
        episode: 1,
        description: "As another day of fantasy plays out in Westworld, a park where guests interact with android hosts, a few hosts begin to malfunction.",
        duration: "68m",
        image: "https://m.media-amazon.com/images/M/MV5BZDg1OWRiMTktZDdiNy00NTZlLTg2Y2EtNWRiMTcxMGE5YTUxXkEyXkFqcGdeQXVyMTM2Mzg4MA@@._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  },
  {
    id: "s12",
    title: "Black Mirror",
    description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    year: "2011-Present",
    rating: "TV-MA",
    seasons: 5,
    episodeCount: 22,
    genres: ["Drama", "Sci-Fi", "Thriller"],
    starring: ["Various"],
    creator: "Charlie Brooker",
    image: "https://m.media-amazon.com/images/M/MV5BYTM3YWVhMDMtNjczMy00NGEyLWJhZDctYjNhMTRkNDE0ZTI1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    trailerUrl: "https://www.youtube.com/embed/1iqra1ojEvM?si=suByuFWsMqoGwBgX",
    imdbRating: 8.8,
    network: "Channel 4, Netflix",
    language: "English",
    country: "United Kingdom",
    awards: "Won 6 Primetime Emmys. 23 wins & 60 nominations total",
    actors: [
      {
        id: "s12a1",
        name: "Various",
        character: "Various",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg"
      }
    ],
    episodes: [
      {
        id: "s12e1",
        title: "The National Anthem",
        season: 1,
        episode: 1,
        description: "The British Prime Minister faces a shocking dilemma when Princess Susannah is kidnapped.",
        duration: "44m",
        image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
        videoUrl: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
      }
    ]
  }
];

export default function SeriesPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTrailer, setIsTrailer] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null)
  const toast = useToast()

  // Find the series by ID
  const show = series.find((s) => s.id === params.id) || series[0]

  // Get the selected episode or default to the first one
  const episode = selectedEpisode ? show.episodes.find((ep) => ep.id === selectedEpisode) : show.episodes[0]

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: show.title,
          text: `Check out ${show.title} on Filmora`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Series link copied to clipboard",
        })
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        {isPlaying ? (
          <div className="relative">
            <EnhancedVideoPlayer
              videoUrl={
                isTrailer ? show.trailerUrl : selectedEpisode ? episode?.videoUrl || show.videoUrl : show.videoUrl
              }
              title={
                isTrailer
                  ? `${show.title} - Trailer`
                  : selectedEpisode
                    ? `${show.title} - ${episode?.title}`
                    : show.title
              }
              poster={selectedEpisode ? episode?.image || show.image : show.image}
              onClose={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          <div className="relative h-[70vh] w-full">
            <Image src={show.image || "/placeholder.svg"} alt={show.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                className="bg-white/90 hover:bg-white text-black rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => {
                  setIsTrailer(false)
                  setSelectedEpisode(null)
                  setIsPlaying(true)
                }}
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Series details */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{show.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">{show.imdbRating}</span>
                  <span className="text-gray-400 ml-1">/10</span>
                </div>
                <span>{show.year}</span>
                <span>{show.rating}</span>
                <span>
                  {show.seasons} {show.seasons === 1 ? "Season" : "Seasons"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {show.genres.map((genre, index) => (
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
                    setIsTrailer(false)
                    setSelectedEpisode(show.episodes[0].id)
                    setIsPlaying(true)
                  }}
                >
                  <Play className="mr-2 h-5 w-5" /> Play
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600"
                  onClick={() => {
                    setIsTrailer(true)
                    setIsPlaying(true)
                  }}
                >
                  <Play className="mr-2 h-5 w-5 text-black" /> Watch Trailer
                </Button>
                <WatchlistButton movieId={show.id} movieTitle={show.title} movieImage={show.image} />
                <Button variant="outline" className="border-gray-600">
                  <ThumbsUp className="mr-2 h-5 w-5" /> Rate
                </Button>
                <Button variant="outline" className="border-gray-600" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5 text-black" /> Share
                </Button>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-gray-300">{show.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                  <h3 className="text-gray-400">Creator</h3>
                  <p>{show.creator}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Year</h3>
                  <p>{show.year}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Language</h3>
                  <p>{show.language}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Country</h3>
                  <p>{show.country}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Network</h3>
                  <p>{show.network}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Episodes</h3>
                  <p>{show.episodeCount}</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Awards</h2>
                <p className="text-gray-300">{show.awards}</p>
              </div>

              {/* Episodes section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Episodes</h2>
                <div className="space-y-4">
                  {show.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      className={`flex gap-4 p-3 rounded-lg cursor-pointer ${selectedEpisode === ep.id ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
                      onClick={() => {
                        setSelectedEpisode(ep.id)
                        setIsTrailer(false)
                        setIsPlaying(true)
                      }}
                    >
                      <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image src={ep.image || show.image} alt={ep.title} fill className="object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="h-8 w-8" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{ep.title}</h3>
                        <div className="text-sm text-gray-400 mb-1">
                          Season {ep.season}, Episode {ep.episode} • {ep.duration}
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-2">{ep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cast section */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {show.actors.map((actor) => (
                    <div key={actor.id} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <Image
                          src={actor.image || "/placeholder.svg"}
                          alt={actor.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <span className="text-sm text-gray-300">View profile</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="font-semibold truncate">{actor.name}</h3>
                        <p className="text-sm text-gray-400 truncate">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments section */}
              <CommentSection movieId={show.id} movieTitle={show.title} />
            </div>

            <div>
              {/* Similar series */}
              <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
              <div className="space-y-4">
                {series
                  .filter((s) => s.id !== show.id)
                  .map((similarShow) => (
                    <Link key={similarShow.id} href={`/series/${similarShow.id}`} className="group">
                      <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={similarShow.image || "/placeholder.svg"}
                            alt={similarShow.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold group-hover:text-red-500 transition-colors">
                            {similarShow.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{similarShow.year}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{similarShow.imdbRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
