import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

// Define the Actor type for better type safety and autocompletion
interface Film {
  id: string;
  title: string;
  year: number;
  character: string;
  image: string;
}

interface Actor {
  id: string;
  name: string;
  bio: string;
  birthDate: string;
  birthPlace: string;
  height: string;
  image: string;
  knownFor: string[];
  awards: string[];
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  filmography: Film[];
}

export default function ActorPage({ params }: { params: { id: string } }) {
  // This would come from your API in a real app
  const actorsData: Record<string, Actor> = {
    "1": {
      id: "1",
      name: "Leonardo DiCaprio",
      bio: "Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biopics and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards.",
      birthDate: "November 11, 1974",
      birthPlace: "Los Angeles, California, USA",
      height: '6\' 0" (1.83 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_.jpg",
      knownFor: ["Inception", "The Revenant", "Titanic", "The Wolf of Wall Street"],
      awards: ["Academy Award for Best Actor", "3 Golden Globe Awards", "BAFTA Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film1",
          title: "Inception",
          year: 2010,
          character: "Dom Cobb",
          image: "/placeholder.svg?height=300&width=200&text=Inception",
        },
        {
          id: "film2",
          title: "The Revenant",
          year: 2015,
          character: "Hugh Glass",
          image: "/placeholder.svg?height=300&width=200&text=Revenant",
        },
        {
          id: "film3",
          title: "The Wolf of Wall Street",
          year: 2013,
          character: "Jordan Belfort",
          image: "/placeholder.svg?height=300&width=200&text=Wolf",
        },
      ],
    },
    "2": {
      id: "2",
      name: "Tom Hanks",
      bio: "Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide, and is widely regarded as an American cultural icon.",
      birthDate: "July 9, 1956",
      birthPlace: "Concord, California, USA",
      height: '6\' 0" (1.83 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg",
      knownFor: ["Forrest Gump", "Saving Private Ryan", "Cast Away"],
      awards: ["2 Academy Awards", "4 Golden Globe Awards", "7 Primetime Emmy Awards"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film4",
          title: "Forrest Gump",
          year: 1994,
          character: "Forrest Gump",
          image: "/placeholder.svg?height=300&width=200&text=Forrest",
        },
        {
          id: "film5",
          title: "Saving Private Ryan",
          year: 1998,
          character: "Captain John H. Miller",
          image: "/placeholder.svg?height=300&width=200&text=Ryan",
        },
        {
          id: "film6",
          title: "Cast Away",
          year: 2000,
          character: "Chuck Noland",
          image: "/placeholder.svg?height=300&width=200&text=Cast",
        },
      ],
    },
    "3": {
      id: "3",
      name: "Meryl Streep",
      bio: "Mary Louise Streep is an American actress. Often described as the best actress of her generation, Streep is particularly known for her versatility and accent adaptability.",
      birthDate: "June 22, 1949",
      birthPlace: "Summit, New Jersey, USA",
      height: '5\' 6" (1.68 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTU4Mjk5MDExOF5BMl5BanBnXkFtZTcwOTU1MTMyMw@@._V1_.jpg",
      knownFor: ["The Devil Wears Prada", "Sophie's Choice", "The Iron Lady"],
      awards: ["3 Academy Awards", "8 Golden Globe Awards", "2 BAFTA Awards"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film7",
          title: "The Devil Wears Prada",
          year: 2006,
          character: "Miranda Priestly",
          image: "/placeholder.svg?height=300&width=200&text=Prada",
        },
        {
          id: "film8",
          title: "Sophie's Choice",
          year: 1982,
          character: "Sophie Zawistowski",
          image: "/placeholder.svg?height=300&width=200&text=Sophie",
        },
        {
          id: "film9",
          title: "The Iron Lady",
          year: 2011,
          character: "Margaret Thatcher",
          image: "/placeholder.svg?height=300&width=200&text=Iron",
        },
      ],
    },
    "4": {
      id: "4",
      name: "Denzel Washington",
      bio: "Denzel Hayes Washington Jr. is an American actor, director, and producer. He has been described as an actor who reconfigured the concept of classic movie stardom.",
      birthDate: "December 28, 1954",
      birthPlace: "Mount Vernon, New York, USA",
      height: '6\' 1" (1.85 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTk5MTkzODI5NF5BMl5BanBnXkFtZTcwNjExNjI1OQ@@._V1_.jpg",
      knownFor: ["Training Day", "Malcolm X", "The Equalizer"],
      awards: ["2 Academy Awards", "3 Golden Globe Awards", "1 Tony Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film10",
          title: "Training Day",
          year: 2001,
          character: "Alonzo Harris",
          image: "/placeholder.svg?height=300&width=200&text=Training",
        },
        {
          id: "film11",
          title: "Malcolm X",
          year: 1992,
          character: "Malcolm X",
          image: "/placeholder.svg?height=300&width=200&text=Malcolm",
        },
        {
          id: "film12",
          title: "The Equalizer",
          year: 2014,
          character: "Robert McCall",
          image: "/placeholder.svg?height=300&width=200&text=Equalizer",
        },
      ],
    },
    "5": {
      id: "5",
      name: "Jennifer Lawrence",
      bio: "Jennifer Shrader Lawrence is an American actress. The films she has acted in have grossed over $6 billion worldwide, and she was the highest-paid actress in the world in 2015 and 2016.",
      birthDate: "August 15, 1990",
      birthPlace: "Indian Hills, Kentucky, USA",
      height: '5\' 9" (1.75 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BOTU3NDE5MDQ4MV5BMl5BanBnXkFtZTgwMzE5ODQ3MDI@._V1_.jpg",
      knownFor: ["The Hunger Games", "Silver Linings Playbook", "X-Men: First Class"],
      awards: ["Academy Award for Best Actress", "3 Golden Globe Awards", "1 BAFTA Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film13",
          title: "The Hunger Games",
          year: 2012,
          character: "Katniss Everdeen",
          image: "/placeholder.svg?height=300&width=200&text=Hunger",
        },
        {
          id: "film14",
          title: "Silver Linings Playbook",
          year: 2012,
          character: "Tiffany Maxwell",
          image: "/placeholder.svg?height=300&width=200&text=Silver",
        },
        {
          id: "film15",
          title: "X-Men: First Class",
          year: 2011,
          character: "Raven Darkhölme",
          image: "/placeholder.svg?height=300&width=200&text=X-Men",
        },
      ],
    },
    "6": {
      id: "6",
      name: "Robert Downey Jr.",
      bio: "Robert John Downey Jr. is an American actor and producer. His career has been characterized by critical and popular success in his youth, followed by a period of substance abuse and legal troubles, before a resurgence of commercial success in middle age.",
      birthDate: "April 4, 1965",
      birthPlace: "Manhattan, New York, USA",
      height: '5\' 9" (1.75 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_.jpg",
      knownFor: ["Iron Man", "Sherlock Holmes", "Avengers"],
      awards: ["2 Golden Globe Awards", "1 BAFTA Award", "Screen Actors Guild Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film16",
          title: "Iron Man",
          year: 2008,
          character: "Tony Stark",
          image: "/placeholder.svg?height=300&width=200&text=IronMan",
        },
        {
          id: "film17",
          title: "Sherlock Holmes",
          year: 2009,
          character: "Sherlock Holmes",
          image: "/placeholder.svg?height=300&width=200&text=Sherlock",
        },
        {
          id: "film18",
          title: "Avengers: Endgame",
          year: 2019,
          character: "Tony Stark",
          image: "/placeholder.svg?height=300&width=200&text=Avengers",
        },
      ],
    },
    "7": {
      id: "7",
      name: "Scarlett Johansson",
      bio: "Scarlett Ingrid Johansson is an American actress and singer. She is the highest-grossing box office star of all time and has been dubbed Hollywood's highest-paid actress multiple times.",
      birthDate: "November 22, 1984",
      birthPlace: "Manhattan, New York, USA",
      height: '5\' 3" (1.60 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg",
      knownFor: ["Black Widow", "Lost in Translation", "Marriage Story"],
      awards: ["BAFTA Award", "Tony Award", "2 Academy Award nominations"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film19",
          title: "Black Widow",
          year: 2021,
          character: "Natasha Romanoff",
          image: "/placeholder.svg?height=300&width=200&text=Widow",
        },
        {
          id: "film20",
          title: "Lost in Translation",
          year: 2003,
          character: "Charlotte",
          image: "/placeholder.svg?height=300&width=200&text=Lost",
        },
        {
          id: "film21",
          title: "Marriage Story",
          year: 2019,
          character: "Nicole Barber",
          image: "/placeholder.svg?height=300&width=200&text=Marriage",
        },
      ],
    },
    "8": {
      id: "8",
      name: "Brad Pitt",
      bio: "William Bradley Pitt is an American actor and film producer. He has received multiple awards, including two Academy Awards, two British Academy Film Awards, two Golden Globe Awards, and a Primetime Emmy Award.",
      birthDate: "December 18, 1963",
      birthPlace: "Shawnee, Oklahoma, USA",
      height: '5\' 11" (1.80 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_.jpg",
      knownFor: ["Fight Club", "Once Upon a Time in Hollywood", "Se7en"],
      awards: ["2 Academy Awards", "2 Golden Globe Awards", "Primetime Emmy Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film22",
          title: "Fight Club",
          year: 1999,
          character: "Tyler Durden",
          image: "/placeholder.svg?height=300&width=200&text=Fight",
        },
        {
          id: "film23",
          title: "Once Upon a Time in Hollywood",
          year: 2019,
          character: "Cliff Booth",
          image: "/placeholder.svg?height=300&width=200&text=Hollywood",
        },
        {
          id: "film24",
          title: "Se7en",
          year: 1995,
          character: "David Mills",
          image: "/placeholder.svg?height=300&width=200&text=Se7en",
        },
      ],
    },
    "9": {
      id: "9",
      name: "Viola Davis",
      bio: "Viola Davis is an American actress and producer. She is the first African-American to achieve the Triple Crown of Acting, having won an Academy Award, an Emmy Award, and two Tony Awards.",
      birthDate: "August 11, 1965",
      birthPlace: "St. Matthews, South Carolina, USA",
      height: '5\' 5" (1.65 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BNzUxNjM4ODI1OV5BMl5BanBnXkFtZTgwNTEwNDE2OTE@._V1_.jpg",
      knownFor: ["The Help", "Fences", "How to Get Away with Murder"],
      awards: ["Academy Award", "Emmy Award", "2 Tony Awards"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film25",
          title: "The Help",
          year: 2011,
          character: "Aibileen Clark",
          image: "/placeholder.svg?height=300&width=200&text=Help",
        },
        {
          id: "film26",
          title: "Fences",
          year: 2016,
          character: "Rose Maxson",
          image: "/placeholder.svg?height=300&width=200&text=Fences",
        },
        {
          id: "film27",
          title: "How to Get Away with Murder",
          year: 2014,
          character: "Annalise Keating",
          image: "/placeholder.svg?height=300&width=200&text=Murder",
        },
      ],
    },
    "10": {
      id: "10",
      name: "Tom Hardy",
      bio: "Edward Thomas Hardy is an English actor, producer, and screenwriter. After studying acting at the Drama Centre London, he made his film debut in Ridley Scott's Black Hawk Down.",
      birthDate: "September 15, 1977",
      birthPlace: "Hammersmith, London, England",
      height: '5\' 9" (1.75 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ3ODEyNjA4Nl5BMl5BanBnXkFtZTgwMTE4ODMyMjE@._V1_.jpg",
      knownFor: ["Inception", "Mad Max: Fury Road", "The Dark Knight Rises"],
      awards: ["BAFTA Rising Star Award", "British Independent Film Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film28",
          title: "Inception",
          year: 2010,
          character: "Eames",
          image: "/placeholder.svg?height=300&width=200&text=Inception",
        },
        {
          id: "film29",
          title: "Mad Max: Fury Road",
          year: 2015,
          character: "Max Rockatansky",
          image: "/placeholder.svg?height=300&width=200&text=MadMax",
        },
        {
          id: "film30",
          title: "The Dark Knight Rises",
          year: 2012,
          character: "Bane",
          image: "/placeholder.svg?height=300&width=200&text=DarkKnight",
        },
      ],
    },
    "11": {
      id: "11",
      name: "Emma Stone",
      bio: "Emily Jean Stone is an American actress. She is the recipient of various accolades, including an Academy Award, a British Academy Film Award, and a Golden Globe Award.",
      birthDate: "November 6, 1988",
      birthPlace: "Scottsdale, Arizona, USA",
      height: '5\' 6" (1.68 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_.jpg",
      knownFor: ["La La Land", "The Help", "Easy A"],
      awards: ["Academy Award", "BAFTA Award", "Golden Globe Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film31",
          title: "La La Land",
          year: 2016,
          character: "Mia Dolan",
          image: "/placeholder.svg?height=300&width=200&text=LaLaLand",
        },
        {
          id: "film32",
          title: "The Help",
          year: 2011,
          character: "Eugenia 'Skeeter' Phelan",
          image: "/placeholder.svg?height=300&width=200&text=Help",
        },
        {
          id: "film33",
          title: "Easy A",
          year: 2010,
          character: "Olive Penderghast",
          image: "/placeholder.svg?height=300&width=200&text=EasyA",
        },
      ],
    },
    "12": {
      id: "12",
      name: "Idris Elba",
      bio: "Idrissa Akuna Elba is an English actor, producer, musician, and DJ. He is known for roles including Stringer Bell in The Wire, DCI John Luther in Luther, and Nelson Mandela in Mandela: Long Walk to Freedom.",
      birthDate: "September 6, 1972",
      birthPlace: "Hackney, London, England",
      height: '6\' 3" (1.91 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BNzEzMTI2NjEyNF5BMl5BanBnXkFtZTcwNTA0OTE4OA@@._V1_.jpg",
      knownFor: ["Luther", "The Wire", "Thor"],
      awards: ["Golden Globe Award", "4 Screen Actors Guild Awards"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film34",
          title: "Luther",
          year: 2010,
          character: "DCI John Luther",
          image: "/placeholder.svg?height=300&width=200&text=Luther",
        },
        {
          id: "film35",
          title: "The Wire",
          year: 2002,
          character: "Stringer Bell",
          image: "/placeholder.svg?height=300&width=200&text=Wire",
        },
        {
          id: "film36",
          title: "Thor",
          year: 2011,
          character: "Heimdall",
          image: "/placeholder.svg?height=300&width=200&text=Thor",
        },
      ],
    },
    "13": {
      id: "13",
      name: "Cate Blanchett",
      bio: "Catherine Elise Blanchett is an Australian actor and theatre director. She is regarded as one of the best performers of her generation and is known for her versatile work across independent films, blockbusters, and the stage.",
      birthDate: "May 14, 1969",
      birthPlace: "Melbourne, Victoria, Australia",
      height: '5\' 9" (1.75 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTc1MDI0MDg1NV5BMl5BanBnXkFtZTgwMDM3OTAzMTE@._V1_.jpg",
      knownFor: ["Blue Jasmine", "The Lord of the Rings", "Carol"],
      awards: ["2 Academy Awards", "3 Golden Globe Awards", "3 BAFTA Awards"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film37",
          title: "Blue Jasmine",
          year: 2013,
          character: "Jasmine Francis",
          image: "/placeholder.svg?height=300&width=200&text=Jasmine",
        },
        {
          id: "film38",
          title: "The Lord of the Rings",
          year: 2001,
          character: "Galadriel",
          image: "/placeholder.svg?height=300&width=200&text=LOTR",
        },
        {
          id: "film39",
          title: "Carol",
          year: 2015,
          character: "Carol Aird",
          image: "/placeholder.svg?height=300&width=200&text=Carol",
        },
      ],
    },
    "14": {
      id: "14",
      name: "Morgan Freeman",
      bio: "Morgan Freeman is an American actor, director, and narrator. Freeman has also won numerous awards, including an Academy Award, a Golden Globe Award, and a Screen Actors Guild Award.",
      birthDate: "June 1, 1937",
      birthPlace: "Memphis, Tennessee, USA",
      height: '6\' 2" (1.88 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_.jpg",
      knownFor: ["The Shawshank Redemption", "Se7en", "Million Dollar Baby"],
      awards: ["Academy Award", "Golden Globe Award", "Screen Actors Guild Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film40",
          title: "The Shawshank Redemption",
          year: 1994,
          character: "Ellis Boyd 'Red' Redding",
          image: "/placeholder.svg?height=300&width=200&text=Shawshank",
        },
        {
          id: "film41",
          title: "Se7en",
          year: 1995,
          character: "Detective William Somerset",
          image: "/placeholder.svg?height=300&width=200&text=Se7en",
        },
        {
          id: "film42",
          title: "Million Dollar Baby",
          year: 2004,
          character: "Eddie 'Scrap-Iron' Dupris",
          image: "/placeholder.svg?height=300&width=200&text=Million",
        },
      ],
    },
    "15": {
      id: "15",
      name: "Charlize Theron",
      bio: "Charlize Theron is a South African and American actress and producer. She is the recipient of numerous accolades, including an Academy Award, a Golden Globe Award, and a Screen Actors Guild Award.",
      birthDate: "August 7, 1975",
      birthPlace: "Benoni, South Africa",
      height: '5\' 10" (1.78 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_.jpg",
      knownFor: ["Mad Max: Fury Road", "Monster", "Atomic Blonde"],
      awards: ["Academy Award", "Golden Globe Award", "Screen Actors Guild Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film43",
          title: "Mad Max: Fury Road",
          year: 2015,
          character: "Imperator Furiosa",
          image: "/placeholder.svg?height=300&width=200&text=MadMax",
        },
        {
          id: "film44",
          title: "Monster",
          year: 2003,
          character: "Aileen Wuornos",
          image: "/placeholder.svg?height=300&width=200&text=Monster",
        },
        {
          id: "film45",
          title: "Atomic Blonde",
          year: 2017,
          character: "Lorraine Broughton",
          image: "/placeholder.svg?height=300&width=200&text=Atomic",
        },
      ],
    },
    "16": {
      id: "16",
      name: "Samuel L. Jackson",
      bio: "Samuel Leroy Jackson is an American actor and producer. One of the most widely recognized actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide.",
      birthDate: "December 21, 1948",
      birthPlace: "Washington, D.C., USA",
      height: '6\' 2" (1.89 m)',
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_.jpg",
      knownFor: ["Pulp Fiction", "Django Unchained", "The Avengers"],
      awards: ["BAFTA Award", "Academy Honorary Award", "Screen Actors Guild Award"],
      socialMedia: {
        instagram: "#",
        twitter: "#",
        facebook: "#",
      },
      filmography: [
        {
          id: "film46",
          title: "Pulp Fiction",
          year: 1994,
          character: "Jules Winnfield",
          image: "/placeholder.svg?height=300&width=200&text=Pulp",
        },
        {
          id: "film47",
          title: "Django Unchained",
          year: 2012,
          character: "Stephen",
          image: "/placeholder.svg?height=300&width=200&text=Django",
        },
        {
          id: "film48",
          title: "The Avengers",
          year: 2012,
          character: "Nick Fury",
          image: "/placeholder.svg?height=300&width=200&text=Avengers",
        },
      ],
    },
  };

  // Retrieve the actor based on the ID from params
  const actor = actorsData[params.id];

  // Handle case where actor is not found (e.g., invalid ID)
  if (!actor) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold">Actor Not Found</h1>
        <p className="mt-4">The actor you are looking for does not exist.</p>
        <Link href="/" className="mt-6">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Actor header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={actor.image || "/placeholder.svg"}
                  alt={actor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 flex justify-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.instagram}>
                    <span className="sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.twitter}>
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href={actor.socialMedia.facebook}>
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <h3 className="text-gray-400">Birth Date</h3>
                  <p>{actor.birthDate}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Birth Place</h3>
                  <p>{actor.birthPlace}</p>
                </div>
                <div>
                  <h3 className="text-gray-400">Height</h3>
                  <p>{actor.height}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Biography</h2>
                <p className="text-gray-300">{actor.bio}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Known For</h2>
                <div className="flex flex-wrap gap-2">
                  {actor.knownFor.map((movie, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                    >
                      {movie}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Awards</h2>
                <ul className="list-disc list-inside text-gray-300">
                  {actor.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Filmography */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Filmography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {actor.filmography.map((film) => (
                <Link key={film.id} href={`/movie/${film.id}`} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={film.image || "/placeholder.svg"}
                      alt={film.title}
                      width={200}
                      height={300}
                      className="w-full object-cover aspect-[2/3] group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                      <span className="text-sm text-gray-300">View details</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold truncate">{film.title}</h3>
                    <p className="text-sm text-gray-400">
                      {film.year} • {film.character}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
