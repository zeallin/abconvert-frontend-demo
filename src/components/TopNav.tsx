import NavSearchBar from "@/components/NavSearchBar";
import { PosterSearchFilters } from "@/services/posterService";
import Image from "next/image";
import Link from "next/link";
import BtnCart from "./BtnCart";

interface TopNavProps {
  posterSearchFilters?: PosterSearchFilters;
  isCleanMode?: boolean;
}

export const TopNav = ({
  posterSearchFilters,
  isCleanMode = false,
}: TopNavProps) => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-[linear-gradient(to_bottom,#000000,#000000c6)] shadow px-2 py-2 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              width={256}
              height={256}
              src="/images/cinema_poster_icon.png"
              className="w-12 h-auto"
              alt="Cinema Posters"
            />
            <span className="font-montserrat text-xl text-gold-400 hover:text-gold-300">
              CINEMA POSTERS
            </span>
          </div>
        </Link>
        {!isCleanMode ? (
          <>
            <NavSearchBar posterSearchFilters={posterSearchFilters} />

            <div className="md:hidden flex items-center">
              <button
                id="hamburger"
                className="text-gray-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4 mr-6">
              <BtnCart />
            </div>
          </>
        ) : null}
      </nav>

      <div
        id="mobile-menu"
        className="md:hidden hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50"
      >
        <div className="flex flex-col items-center py-2">
          <a
            href="#"
            className="text-sm text-gray-600 py-2 hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 py-2 hover:text-blue-600"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm text-gray-600 py-2 hover:text-blue-600"
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
};

export default TopNav;
