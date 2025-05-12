import Link from "next/link"
import { TrendingUp } from "lucide-react"
import FeaturedMovie from "@/components/featured-movie"
import MovieRow from "@/components/movie-row"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <FeaturedMovie />

        {/* Categories */}
        <section className="px-4 md:px-8 py-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending Now
          </h2>
          <MovieRow category="trending" />

          <h2 className="text-2xl font-bold mt-8 mb-4">Popular Movies</h2>
          <MovieRow category="popular" />

          <h2 className="text-2xl font-bold mt-8 mb-4">Top Rated Series</h2>
          <MovieRow category="series" />

          <h2 className="text-2xl font-bold mt-8 mb-4">Action</h2>
          <MovieRow category="action" />

          <h2 className="text-2xl font-bold mt-8 mb-4">Comedy</h2>
          <MovieRow category="comedy" />
        </section>
      </main>

      <footer className="px-4 md:px-8 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Filmora</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/devices" className="text-gray-400 hover:text-white">
                    Devices
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="text-gray-400 hover:text-white">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/redeem" className="text-gray-400 hover:text-white">
                    Redeem Gift
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Filmora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
