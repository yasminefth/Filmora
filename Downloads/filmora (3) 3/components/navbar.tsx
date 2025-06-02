"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Mock Data (Replace with your actual data fetching) ---
const allContent = [
  { id: "1", title: "Inception", type: "movie", imageUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg" },
  { id: "s1", title: "Breaking Bad", type: "series", imageUrl: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg" },
  { id: "m2", title: "The Matrix", type: "movie", imageUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTEzLWI0MGMtZjUyaPAsdF5BMl5BanBnXkFtZTcwMjUzNjQ3OA@@._V1_FMjpg_UX1000_.jpg" },
  { id: "s2", title: "Stranger Things", type: "series", imageUrl: "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" },
  { id: "m3", title: "Interstellar", type: "movie", imageUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktNjg0Yy00ZTMyLThjYTYtMmZlZjYyYmIyMzhlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" },
  { id: "s3", title: "The Crown", type: "series", imageUrl: "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctNTRmNy00Njk3LWFjMzctMWQwZDAwMGJmY2MyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" },
  { id: "m4", title: "Pulp Fiction", type: "movie", imageUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtYjU0MS00ZTMyLWIzYWMtYjczN2YxNWQxMGRlXkEyXkFqcGdeQXVyMTA2ODkwMTI3._V1_FMjpg_UX1000_.jpg" },
  { id: "s4", title: "Game of Thrones", type: "series", imageUrl: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMDAwMTY@._V1_.jpg" },
];
// -----------------------------------------------------------

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false); // To control visibility of results

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to filter search results whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.length > 1) { // Only search if more than one character
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchActive(true); // Show results when there's a search term
    } else {
      setSearchResults([]);
      setIsSearchActive(false); // Hide results when search term is too short or empty
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBlur = () => {
    // A small delay to allow click on search results before hiding
    setTimeout(() => {
      setIsSearchActive(false);
    }, 200);
  };

  const handleFocus = () => {
    if (searchTerm.length > 1) {
      setIsSearchActive(true);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-red-600 font-bold text-2xl">FILMORA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
            <Link href="/series" className="text-white hover:text-gray-300">
              Series
            </Link>
            <Link href="/genres" className="text-white hover:text-gray-300">
              Genres
            </Link>
            <Link href="/actors" className="text-white hover:text-gray-300">
              Actors
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-red-600 pr-10"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              {isSearchActive && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto z-10">
                  {searchResults.map(result => (
                    <Link
                      key={result.id}
                      href={`/${result.type === 'movie' ? 'movie' : 'series'}/${result.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => {
                        setSearchTerm(""); // Clear search term on click
                        setIsSearchActive(false); // Hide results
                        setIsMobileMenuOpen(false); // Close mobile menu if open
                      }}
                    >
                      {result.imageUrl && (
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className="w-10 h-14 object-cover mr-3 rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-white">{result.title}</p>
                        <p className="text-sm text-gray-400 capitalize">{result.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile search icon (toggles mobile menu which includes search input) */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              // If opening, ensure search is clear and active if needed
              if (!isMobileMenuOpen && searchTerm.length > 1) setIsSearchActive(true);
              // If closing, hide search results
              if (isMobileMenuOpen) setIsSearchActive(false);
            }}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            {isLoggedIn && (
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            )}

            {/* User menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 text-white border-gray-700">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-800">
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800">
                    <Link href="/watchlist" className="w-full">
                      My Watchlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800">
                    <Link href="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="hover:bg-gray-800">
                    <button className="w-full text-left" onClick={() => setIsLoggedIn(false)}>
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-white">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu and search input */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              {isSearchActive && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto z-10">
                  {searchResults.map(result => (
                    <Link
                      key={result.id}
                      href={`/${result.type === 'movie' ? 'movies' : 'series'}/${result.id}`}
                      className="flex items-center p-3 hover:bg-gray-800 transition-colors duration-200"
                      onClick={() => {
                        setSearchTerm("");
                        setIsSearchActive(false);
                        setIsMobileMenuOpen(false); // Close mobile menu after selection
                      }}
                    >
                      {result.imageUrl && (
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className="w-10 h-14 object-cover mr-3 rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-white">{result.title}</p>
                        <p className="text-sm text-gray-400 capitalize">{result.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/" className="block py-2 text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/movies" className="block py-2 text-white hover:text-gray-300">
              Movies
            </Link>
            <Link href="/series" className="block py-2 text-white hover:text-gray-300">
              Series
            </Link>
            <Link href="/genres" className="block py-2 text-white hover:text-gray-300">
              Genres
            </Link>
            <Link href="/actors" className="block py-2 text-white hover:text-gray-300">
              Actors
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}