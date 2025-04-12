"use client";
import { PosterSearchFilters } from "@/services/posterService";
import {
  CaretCircleDown,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavSearchBarProps {
  posterSearchFilters?: PosterSearchFilters;
}

export const NavSearchBar = ({ posterSearchFilters }: NavSearchBarProps) => {
  const router = useRouter();

  const [searchFilters, setSearchFilters] = useState<
    PosterSearchFilters | undefined
  >(posterSearchFilters);

  const navToSearch = () => {
    router.push(
      `/poster?keyword=${encodeURIComponent(searchFilters?.keyword ?? "")}`
    );
  };

  return (
    <div className="hidden items-center md:flex flex-1 mx-4 max-w-lg">
      <div className="w-full flex items-center bg-gold-100">
        <MagnifyingGlass className="mx-2" color="#B68D40" size="24" />

        <input
          type="text"
          placeholder="Movie name or keyword..."
          className="w-full text-gold-600 focus:outline-none bg-gold-100 focus:ring-0 placeholder-gold-800/40"
          value={searchFilters?.keyword}
          onChange={(e) => {
            setSearchFilters({ ...searchFilters, keyword: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navToSearch();
            }
          }}
        />
        <button
          type="button"
          className="text-gold-800 bg-gold hover:bg-gold-400 hover:text-gold-700 font-medium  text-sm px-4 py-2"
          onClick={() => {
            navToSearch();
          }}
        >
          Search
        </button>
      </div>
      <div className="flex text-gold-800 bg-gold font-medium mx-2 text-sm px-3 py-2 hover:bg-gold-400 hover:text-gold-700">
        <div>Categories</div>
        <CaretCircleDown className="ml-2" color="#75561c" size="20" />
      </div>
    </div>
  );
};

export default NavSearchBar;
