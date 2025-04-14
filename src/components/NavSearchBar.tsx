"use client";
import { PosterSearchFilters } from "@/services/posterService";
import Checker from "@/utils/checker";
import { QueryParamHelper } from "@/utils/queryParamHelper";
import {
  CaretCircleDown,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavSearchBarProps {
  posterSearchFilters?: PosterSearchFilters;
}

interface CategoryItem {
  name: string;
  paramName: string;
  extra?: string;
}

const trendItems: CategoryItem[] = [
  { name: "Staff Picks", paramName: "staff_pick" },
  { name: "Top Selling", paramName: "top_selling" },
  { name: "New Release", paramName: "new_release" },
];

const genreItems: CategoryItem[] = [
  { name: "All", paramName: "" },
  { name: "Action", paramName: "action" },
  { name: "Comedy", paramName: "comedy" },
  { name: "Crime", paramName: "crime" },
  { name: "Drama", paramName: "drama" },
  { name: "Western", paramName: "western" },
  { name: "History", paramName: "history" },
  { name: "Horror", paramName: "horror" },
  { name: "Musical", paramName: "musical" },
  { name: "Film-Noir", paramName: "film" },
];

const decadeItems: CategoryItem[] = [
  { name: "All", paramName: "" },
  { name: "1920s", paramName: "1920" },
  { name: "1930s", paramName: "1930" },
  { name: "1940s", paramName: "1940" },
  { name: "1950s", paramName: "1950" },
  { name: "1960s", paramName: "1960" },
  { name: "1970s", paramName: "1970" },
  { name: "1980s", paramName: "1980" },
  { name: "1990s", paramName: "1990" },
  { name: "2000s", paramName: "2000" },
  { name: "2010s", paramName: "2010" },
  { name: "2020s", paramName: "2020" },
];

const colorItems: CategoryItem[] = [
  { name: "All", paramName: "", extra: "bg-transparent" },
  { name: "Black", paramName: "black", extra: "bg-black" },
  { name: "White", paramName: "white", extra: "bg-white" },
  { name: "Red", paramName: "red", extra: "bg-red-500" },
  { name: "Orange", paramName: "orange", extra: "bg-orange-500" },
  { name: "Yellow", paramName: "yellow", extra: "bg-yellow-500" },
  { name: "Blue", paramName: "blue", extra: "bg-blue-500" },
  { name: "Green", paramName: "green", extra: "bg-green-500" },
  { name: "Brown", paramName: "brown", extra: "bg-amber-800" },
  { name: "Pink", paramName: "pink", extra: "bg-pink-500" },
  { name: "Purple", paramName: "purple", extra: "bg-purple-500" },
  { name: "Gray", paramName: "gray", extra: "bg-gray-500" },
];

export const NavSearchBar = ({ posterSearchFilters }: NavSearchBarProps) => {
  const router = useRouter();
  const [isShowCatetory, setIsShowCatetory] = useState(false);
  // Can do multiple select later
  //   const [selectedCategory, setSelectedCategory] = useState();
  //   const [selectedYear, setSelectedYear] = useState();
  //   const [selectedColor, setSelectedColor] = useState();

  const [searchFilters, setSearchFilters] = useState<
    PosterSearchFilters | undefined
  >(posterSearchFilters);

  const navToSearch = (customSearchFilters?: PosterSearchFilters) => {
    router.push(
      QueryParamHelper.getPosterSearchUrl(
        "/poster",
        customSearchFilters ?? searchFilters
      )
    );
    if (customSearchFilters) setSearchFilters(customSearchFilters);
  };

  return (
    <div className="hidden relative items-center md:flex flex-1 mx-4 max-w-lg">
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
      <div
        className="flex text-gold-800 bg-gold font-medium ml-2 text-sm px-3 py-2 hover:bg-gold-400 hover:text-gold-700 cursor-pointer"
        onClick={() => {
          setIsShowCatetory(!isShowCatetory);
        }}
      >
        <div>Categories</div>
        <CaretCircleDown className="ml-2" color="#75561c" size="20" />
      </div>

      {isShowCatetory ? (
        <div className="absolute w-full flex justify-between bg-background border-1 border-gold top-full mt-1 left-0 shadow-lg z-10 p-2 gap-4">
          <div className="flex flex-col">
            <div className="text-xl font-montserrat text-gold-400 mb-2">
              Trend
            </div>
            {trendItems.map((item) => (
              <div
                className={`text-lg flex hover:text-gold-300 items-center cursor-pointer gap-1 ${
                  searchFilters?.category === item.paramName
                    ? "text-gold-400"
                    : ""
                } `}
                key={item.paramName}
                onClick={() => {
                  navToSearch({
                    ...searchFilters,
                    category: item.paramName,
                  });
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-montserrat text-gold-400 mb-2">
              Genre
            </div>
            {genreItems.map((item) => (
              <div
                className={`text-lg flex hover:text-gold-300 items-center cursor-pointer gap-1 ${
                  searchFilters?.category === item.paramName
                    ? "text-gold-400"
                    : ""
                } `}
                key={item.paramName}
                onClick={() => {
                  navToSearch({
                    ...searchFilters,
                    category: item.paramName,
                  });
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-montserrat text-gold-400 mb-2">
              Decade
            </div>
            {decadeItems.map((item) => {
              const year = parseInt(item.paramName);
              return (
                <div
                  className={`text-lg flex hover:text-gold-300 items-center cursor-pointer gap-1 ${
                    searchFilters?.yearGte === year || isNaN(year)
                      ? "text-gold-400"
                      : ""
                  } `}
                  key={item.paramName}
                  onClick={() => {
                    if (isNaN(year)) {
                      navToSearch({
                        ...searchFilters,
                        yearGte: undefined,
                        yearLte: undefined,
                      });
                    } else {
                      navToSearch({
                        ...searchFilters,
                        yearGte: year,
                        yearLte: year + 9,
                      });
                    }
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-montserrat text-gold-400 mb-2">
              Color
            </div>
            {colorItems.map((item) => (
              <div
                className={`text-lg flex hover:text-gold-300 items-center cursor-pointer gap-1 ${
                  searchFilters?.color === item.paramName ? "text-gold-400" : ""
                } `}
                key={item.paramName}
                onClick={() => {
                  navToSearch({
                    ...searchFilters,
                    color: item.paramName,
                  });
                }}
              >
                {Checker.isNonEmptyStr(item.paramName) ? (
                  <div
                    className={`w-3 h-3 border-1 border-white ${item.extra}`}
                  ></div>
                ) : null}
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavSearchBar;
