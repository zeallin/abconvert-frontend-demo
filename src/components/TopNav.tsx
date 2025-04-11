import {
  CaretCircleDown,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BtnCart from "./BtnCart";

export const TopNav = () => {
  return (
    <>
      <nav className="bg-black shadow px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <span className="font-montserrat text-2xl font-semibold text-white-400">
              CinemaPosters
            </span>
          </div>
        </Link>

        <div className="hidden items-center md:flex flex-1 mx-4 max-w-lg">
          <div className="w-full flex items-center bg-gold-100">
            <MagnifyingGlass className="mx-2" color="#B68D40" size="24" />

            <input
              type="text"
              placeholder="Movie name or keyword..."
              className="w-full text-gold-600 focus:outline-none bg-gold-100 focus:ring-0 placeholder-gold-800/40"
            />
            <button
              type="button"
              className="text-gold-800 bg-gold hover:bg-gold-400 hover:text-gold-700 font-medium  text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
          <div className="flex text-gold-800 bg-gold font-medium mx-2 text-sm px-3 py-2 hover:bg-gold-400 hover:text-gold-700">
            <div>Categories</div>
            <CaretCircleDown className="ml-2" color="#75561c" size="20" />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button id="hamburger" className="text-gray-600 focus:outline-none">
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

        <div className="hidden md:flex items-center space-x-4">
          <BtnCart />
        </div>
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
